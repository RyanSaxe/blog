#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Convert fastpages #hide comments to nbconvert cell tags."""

import json
import sys

# The formatter writes `#hide` as `# hide`, so both spellings hide a cell.
HIDE_TAGS = {
    "hide": "remove_cell",
    "hide_input": "remove_input",
    "hide_output": "remove_output",
}


def comment_text(line: str) -> str:
    line = line.strip()
    return line.removeprefix("#").strip() if line.startswith("#") else ""


def tag_cells(input_path: str, output_path: str) -> None:
    with open(input_path) as f:
        nb = json.load(f)

    for cell in nb["cells"]:
        if cell["cell_type"] != "code":
            continue

        source = cell.get("source", [])
        if not source:
            continue

        tags = cell.get("metadata", {}).get("tags", [])
        tag = HIDE_TAGS.get(comment_text(source[0]))

        if tag:
            tags.append(tag)
            cell.setdefault("metadata", {})["tags"] = list(set(tags))
            # Strip the #hide* comment from cell source
            remaining = source[1:]
            while remaining and remaining[0].strip() == "":
                remaining = remaining[1:]
            cell["source"] = remaining

    with open(output_path, "w") as f:
        json.dump(nb, f, indent=1)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input.ipynb> <output.ipynb>")
        sys.exit(1)
    tag_cells(sys.argv[1], sys.argv[2])
