#!/usr/bin/env python3
"""Transform nbconvert markdown output into Astro content collection entries.

Handles:
- Frontmatter generation from per-notebook meta.yaml
- Citation conversion ({% cite KEY %} -> inline author-year with link)
- Footnote conversion ({% fn N %} / fndetail -> markdown footnotes)
- Image path fixing
- LaTeX compatibility fixes
- HTML cleanup
"""

import argparse
import re
from pathlib import Path

import yaml


def load_meta(notebook_dir: str) -> dict:
    meta_path = Path(notebook_dir) / "meta.yaml"
    with open(meta_path) as f:
        return yaml.safe_load(f)


def load_citations(notebook_dir: str) -> dict:
    citations_path = Path(notebook_dir).parent / "citations.yaml"
    with open(citations_path) as f:
        return yaml.safe_load(f)


def generate_frontmatter(meta: dict) -> str:
    cats = ", ".join(f'"{c}"' for c in meta["categories"])
    return f"""---
title: "{meta['title']}"
description: "{meta['description']}"
date: {meta['date']}
heroImage: "{meta['heroImage']}"
categories: [{cats}]
---"""


def extract_footnotes_from_fndetail(text: str) -> dict[int, str]:
    """Extract footnote definitions from fndetail Liquid syntax."""
    footnotes = {}
    pattern = r"""\{\{\s*(?P<q>['\"])(.+?)(?P=q)\s*\|\s*fndetail:\s*(\d+)\s*\}\}"""
    for match in re.finditer(pattern, text, re.DOTALL):
        content = match.group(2).strip()
        num = int(match.group(3))
        footnotes[num] = content
    return footnotes


def convert_citations(text: str, citations: dict) -> tuple[str, list[str]]:
    """Replace {% cite KEY %} with inline author-year link and collect used keys in order."""
    seen: list[str] = []

    def replacer(m):
        key = m.group(1).strip()
        is_first = key not in seen
        if is_first:
            seen.append(key)
        short = citations[key]["short"]
        if is_first:
            return f'<cite id="cite-{key}"><a href="#ref-{key}">({short})</a></cite>'
        return f'<cite><a href="#ref-{key}">({short})</a></cite>'

    text = re.sub(r"\{%\s*cite\s+(\w+)\s*%\}", replacer, text)
    return text, seen


def convert_fn_refs(text: str) -> str:
    """Replace {% fn N %} with [^fn-N]."""
    return re.sub(r"\{%\s*fn\s+(\d+)\s*%\}", r"[^fn-\1]", text)


def fix_image_paths(text: str, slug: str) -> str:
    """Fix image paths to work with the Astro public/ directory."""
    text = re.sub(
        r"https?://ryansaxe\.com/images/", "/images/", text
    )
    text = re.sub(r"!\[([^\]]*)\]\(images/", r"![\1](/images/", text)
    text = re.sub(r'src="images/', 'src="/images/', text)
    text = re.sub(r'src="/images/', 'src="/images/', text)
    for dirname in ["output_files", "executed_files", "notebook_files"]:
        text = text.replace(
            f"{dirname}/", f"/images/generated/{slug}/"
        )
    text = re.sub(
        r"!\[([^\]]*)\]\(/tmp/([^)]+)\)",
        rf"![\1](/images/generated/{slug}/\2)",
        text,
    )
    text = re.sub(r'src="/tmp/', f'src="/images/generated/{slug}/', text)
    return text


def fix_latex(text: str) -> str:
    """Fix LaTeX commands not supported by KaTeX."""
    text = text.replace(r"\Reals", r"\mathbb{R}")
    text = text.replace(r"^\inv", "^{-1}")
    text = re.sub(r"\\inv\b", r"^{-1}", text)
    text = text.replace(r"\centerdot", r"\cdot")
    return text


def clean_html(text: str, slug: str) -> str:
    """Remove fastpages HTML artifacts."""
    text = re.sub(
        r'<div class="fake-header h2">\s*(.+?)\s*</div>',
        r"## \1",
        text,
    )
    text = re.sub(
        r'<div class="fake-header h3">\s*(.+?)\s*</div>',
        r"### \1",
        text,
    )

    text = re.sub(r"\{%\s*bibliography\s+--cited\s*%\}", "", text)

    text = re.sub(
        r"<ol class=['\"]footnotes['\"]>.*?</ol>",
        "",
        text,
        flags=re.DOTALL,
    )

    if slug == "transparent-nn":
        text = re.sub(
            r"<li style.*?</li>",
            '\n> **Prerequisite**: This post builds on [From Linear Models to Neural Networks](/blog/linear-nn/).\n',
            text,
            flags=re.DOTALL,
        )

    text = re.sub(r"\{%\s*raw\s*%\}", "", text)
    text = re.sub(r"\{%\s*endraw\s*%\}", "", text)

    text = re.sub(r"##\s*References\s*\n*", "", text)
    text = re.sub(r"##\s*Footnotes\s*\n*", "", text)

    return text


def remove_cell0_metadata(text: str) -> str:
    """Remove the fastpages metadata from the first cell (title, description, list items)."""
    lines = text.split("\n")
    cleaned = []
    in_header = True
    for line in lines:
        if in_header:
            stripped = line.strip()
            if stripped.startswith("# "):
                continue
            if stripped.startswith("> "):
                continue
            if stripped.startswith("- ") and ":" in stripped:
                continue
            if not stripped:
                continue
            in_header = False
        cleaned.append(line)
    return "\n".join(cleaned)


def postprocess(input_path: str, output_path: str, slug: str, notebook_dir: str) -> None:
    text = Path(input_path).read_text()

    meta = load_meta(notebook_dir)
    citations = load_citations(notebook_dir)

    # Step 1: Remove cell 0 metadata
    text = remove_cell0_metadata(text)

    # Step 2: Extract fndetail footnotes before cleaning HTML
    fn_definitions = extract_footnotes_from_fndetail(text)

    # Step 3: Convert citations to inline author-year
    text, used_citations = convert_citations(text, citations)

    # Step 4: Convert footnote references
    text = convert_fn_refs(text)

    # Step 5: Fix image paths
    text = fix_image_paths(text, slug)

    # Step 6: Fix LaTeX
    text = fix_latex(text)

    # Step 7: Clean HTML
    text = clean_html(text, slug)

    # Step 8: Generate frontmatter
    frontmatter = generate_frontmatter(meta)

    # Step 9: Build footnote definitions (markdown footnote syntax)
    fn_items = []
    for num in sorted(fn_definitions):
        content = fn_definitions[num]
        content = fix_latex(content)
        fn_items.append(f"[^fn-{num}]: {content}")

    fn_tail = ""
    if fn_items:
        fn_tail = "\n\n" + "\n\n".join(fn_items)

    # Step 10: Build references section (markdown with anchored spans)
    ref_section = ""
    if used_citations:
        ref_lines = ["", "", "---", "", "## References", ""]
        for i, key in enumerate(used_citations, 1):
            if key in citations:
                back = f' <a href="#cite-{key}" aria-label="Back to reference">↩</a>'
                ref_lines.append(f'{i}. <span id="ref-{key}">{citations[key]["full"]}{back}</span>')
        ref_section = "\n".join(ref_lines)

    # Clean up excessive blank lines
    text = re.sub(r"\n{4,}", "\n\n\n", text)

    final = f"{frontmatter}\n\n{text.strip()}{ref_section}{fn_tail}\n"

    Path(output_path).write_text(final)
    print(f"  Written: {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--slug", required=True)
    parser.add_argument("--notebook-dir", required=True)
    args = parser.parse_args()
    postprocess(args.input, args.output, args.slug, args.notebook_dir)
