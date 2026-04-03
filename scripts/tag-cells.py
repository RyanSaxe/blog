#!/usr/bin/env python3
"""Convert fastpages #hide comments to nbconvert cell tags."""

import json
import sys


def tag_cells(input_path: str, output_path: str) -> None:
    with open(input_path) as f:
        nb = json.load(f)

    for cell in nb["cells"]:
        if cell["cell_type"] != "code":
            continue

        source = cell.get("source", [])
        if not source:
            continue

        first_line = source[0].strip()
        tags = cell.get("metadata", {}).get("tags", [])

        tag = None
        if first_line == "#hide":
            tag = "remove_cell"
        elif first_line == "#hide_input":
            tag = "remove_input"
        elif first_line == "#hide_output":
            tag = "remove_output"

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
