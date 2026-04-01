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

        if first_line == "#hide":
            tags.append("remove_cell")
        elif first_line == "#hide_input":
            tags.append("remove_input")
        elif first_line == "#hide_output":
            tags.append("remove_output")

        if tags:
            cell.setdefault("metadata", {})["tags"] = list(set(tags))

    with open(output_path, "w") as f:
        json.dump(nb, f, indent=1)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input.ipynb> <output.ipynb>")
        sys.exit(1)
    tag_cells(sys.argv[1], sys.argv[2])
