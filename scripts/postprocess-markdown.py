#!/usr/bin/env python3
"""Transform nbconvert markdown output into Astro content collection entries.

Handles:
- Frontmatter generation from notebook cell 0
- Citation conversion ({% cite KEY %} -> markdown footnotes)
- Footnote conversion ({% fn N %} / fndetail -> markdown footnotes)
- Image path fixing
- LaTeX compatibility fixes
- HTML cleanup
"""

import argparse
import re
from pathlib import Path

# BibTeX references extracted from _bibliography/references.bib
CITATIONS = {
    "univ_approx_orig": 'Hornik, Stinchcombe & White, "Multilayer feedforward networks are universal approximators", Neural Networks, 1989.',
    "GLM": 'Nelder & Wedderburn, "Generalized Linear Models", Journal of the Royal Statistical Society, 1972.',
    "GAM": 'Hastie & Tibshirani, "Generalized Additive Models", Statistical Science, 1986.',
    "backfitting_orig": 'Friedman & Stuetzle, "Projection Pursuit Regression", Journal of the American Statistical Association, 1981.',
    "backfitting_two": 'Breiman & Friedman, "Estimating Optimal Transformations for Multiple Regression and Correlation", Journal of the American Statistical Association, 1985.',
    "bspline": "Prautzsch, Boehm & Paluszny, B\u00e9zier and B-Spline Techniques, 2002.",
    "pinkus_1999": 'Pinkus, "Approximation theory of the MLP model in neural networks", Acta Numerica, 1999.',
    "univ_approx_thm": 'Cs\u00e1ji Bal\u00e1zs, "Approximation with Artificial Neural Networks", 2001.',
    "nam_2020": 'Agarwal et al., "Neural Additive Models: Interpretable Machine Learning with Neural Nets", arXiv:2004.13912, 2020.',
    "GANN": 'Potts, "Generalized Additive Neural Networks", KDD \'99, 1999.',
    "conditional_nn": 'Bengio, L\u00e9onard & Courville, "Estimating or Propagating Gradients Through Stochastic Neurons for Conditional Computation", 2013.',
    "piecewise_relu": 'Arora et al., "Understanding Deep Neural Networks with Rectified Linear Units", arXiv:1611.01491, 2018.',
    "bspline_gauss": 'Wang & Lee, "Scale-space derived from B-splines", IEEE TPAMI, 1998.',
}

# Notebook metadata: slug -> {date, title, description, heroImage, categories}
NOTEBOOK_META = {
    "linear-nn": {
        "date": "2021-03-03",
        "title": "From Linear Models to Neural Networks",
        "description": "Neural Networks are a popular machine learning algorithm notorious for being difficult to interpret. It is possible to understand how they work with only the math background of linear models.",
        "heroImage": "/images/nnflow.png",
        "categories": ["fundamentals"],
    },
    "transparent-nn": {
        "date": "2021-03-04",
        "title": "Designing Transparent Neural Networks",
        "description": "Generalized Linear and Additive Models are well-established interpretable approaches to supervised learning. This post connects these approaches to the building blocks of Neural Networks, and demonstrates that it's possible to design Neural Networks that are just as transparent.",
        "heroImage": "/images/nam.png",
        "categories": ["transparency"],
    },
}


def generate_frontmatter(slug: str) -> str:
    meta = NOTEBOOK_META[slug]
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
    # Match {{ 'text' | fndetail: N }} or {{ "text" | fndetail: N }}
    pattern = r"\{\{\s*['\"](.+?)['\"].*?\|\s*fndetail:\s*(\d+)\s*\}\}"
    for match in re.finditer(pattern, text, re.DOTALL):
        content = match.group(1).strip()
        num = int(match.group(2))
        footnotes[num] = content
    return footnotes


def convert_citations(text: str) -> tuple[str, set[str]]:
    """Replace {% cite KEY %} with [^KEY] and collect used keys."""
    used = set()

    def replacer(m):
        key = m.group(1).strip()
        used.add(key)
        return f"[^{key}]"

    text = re.sub(r"\{%\s*cite\s+(\w+)\s*%\}", replacer, text)
    return text, used


def convert_fn_refs(text: str) -> str:
    """Replace {% fn N %} with [^fn-N]."""
    return re.sub(r"\{%\s*fn\s+(\d+)\s*%\}", r"[^fn-\1]", text)


def fix_image_paths(text: str, slug: str) -> str:
    """Fix image paths to work with the Astro public/ directory."""
    # Absolute URLs to local paths
    text = re.sub(
        r"https?://ryansaxe\.com/images/", "/images/", text
    )
    # Relative paths from notebook
    text = re.sub(r"!\[([^\]]*)\]\(images/", r"![\1](/images/", text)
    # HTML img tags
    text = re.sub(r'src="images/', 'src="/images/', text)
    text = re.sub(r'src="/images/', 'src="/images/', text)
    # nbconvert output images (various possible directory names)
    for dirname in ["output_files", "executed_files", "notebook_files"]:
        text = text.replace(
            f"{dirname}/", f"/images/generated/{slug}/"
        )
    # Handle absolute /tmp/ paths from nbconvert runs
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
    # Replace ^\inv with ^{-1} (already has caret)
    text = text.replace(r"^\inv", "^{-1}")
    # Replace standalone \inv with ^{-1}
    text = re.sub(r"\\inv\b", r"^{-1}", text)
    text = text.replace(r"\centerdot", r"\cdot")
    return text


def clean_html(text: str, slug: str) -> str:
    """Remove fastpages HTML artifacts."""
    # Remove fake-header divs, keep content as markdown headings
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

    # Remove bibliography directive
    text = re.sub(r"\{%\s*bibliography\s+--cited\s*%\}", "", text)

    # Remove footnotes <ol> block (we'll add markdown footnotes at the end)
    text = re.sub(
        r"<ol class=['\"]footnotes['\"]>.*?</ol>",
        "",
        text,
        flags=re.DOTALL,
    )

    # Remove the cross-reference card in GANN (cell 3 content)
    if slug == "transparent-nn":
        text = re.sub(
            r"<li style.*?</li>",
            '\n> **Prerequisite**: This post builds on [From Linear Models to Neural Networks](/blog/linear-nn/).\n',
            text,
            flags=re.DOTALL,
        )

    # Remove raw/endraw tags
    text = re.sub(r"\{%\s*raw\s*%\}", "", text)
    text = re.sub(r"\{%\s*endraw\s*%\}", "", text)

    # Remove empty References/Footnotes headings left after cleanup
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
            # Skip the title line (# Title)
            if stripped.startswith("# "):
                continue
            # Skip the description blockquote
            if stripped.startswith("> "):
                continue
            # Skip fastpages metadata lines (- key: value)
            if stripped.startswith("- ") and ":" in stripped:
                continue
            # Skip empty lines at the start
            if not stripped:
                continue
            in_header = False
        cleaned.append(line)
    return "\n".join(cleaned)


def postprocess(input_path: str, output_path: str, slug: str) -> None:
    text = Path(input_path).read_text()

    # Step 1: Remove cell 0 metadata
    text = remove_cell0_metadata(text)

    # Step 2: Extract fndetail footnotes before cleaning HTML
    fn_definitions = extract_footnotes_from_fndetail(text)

    # Step 3: Convert citations
    text, used_citations = convert_citations(text)

    # Step 4: Convert footnote references
    text = convert_fn_refs(text)

    # Step 5: Fix image paths
    text = fix_image_paths(text, slug)

    # Step 6: Fix LaTeX
    text = fix_latex(text)

    # Step 7: Clean HTML
    text = clean_html(text, slug)

    # Step 8: Generate frontmatter
    frontmatter = generate_frontmatter(slug)

    # Step 9: Build footnote definitions section
    footnote_defs = []

    # Fndetail footnotes
    for num in sorted(fn_definitions):
        content = fn_definitions[num]
        content = fix_latex(content)
        footnote_defs.append(f"[^fn-{num}]: {content}")

    # Citation footnotes
    for key in sorted(used_citations):
        if key in CITATIONS:
            footnote_defs.append(f"[^{key}]: {CITATIONS[key]}")

    # Step 10: Assemble final document
    footnotes_section = ""
    if footnote_defs:
        footnotes_section = "\n\n---\n\n## Notes\n\n" + "\n\n".join(footnote_defs)

    # Clean up excessive blank lines
    text = re.sub(r"\n{4,}", "\n\n\n", text)

    final = f"{frontmatter}\n\n{text.strip()}{footnotes_section}\n"

    Path(output_path).write_text(final)
    print(f"  Written: {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--slug", required=True)
    args = parser.parse_args()
    postprocess(args.input, args.output, args.slug)
