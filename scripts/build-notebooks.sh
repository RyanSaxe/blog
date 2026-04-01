#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NOTEBOOKS_DIR="$REPO_ROOT/notebooks"
OUTPUT_DIR="$REPO_ROOT/src/content/blog"
IMAGES_DIR="$REPO_ROOT/public/images/generated"

mkdir -p "$OUTPUT_DIR" "$IMAGES_DIR"

for nb_dir in "$NOTEBOOKS_DIR"/*/; do
    slug=$(basename "$nb_dir")
    nb_file="$nb_dir/notebook.ipynb"

    if [ ! -f "$nb_file" ]; then
        echo "WARNING: No notebook.ipynb in $nb_dir, skipping"
        continue
    fi

    echo "=== Processing: $slug ==="

    # 1. Tag cells (#hide -> nbconvert tags)
    echo "  Tagging cells..."
    python3 "$REPO_ROOT/scripts/tag-cells.py" \
        "$nb_file" \
        "$nb_dir/tagged.ipynb"

    # 2. Install deps & execute notebook
    echo "  Installing dependencies..."
    (cd "$nb_dir" && uv sync --quiet)

    echo "  Executing notebook..."
    (cd "$nb_dir" && uv run jupyter nbconvert \
        --to notebook \
        --execute \
        --output=executed.ipynb \
        --ExecutePreprocessor.timeout=600 \
        tagged.ipynb)

    # 3. Convert to markdown
    echo "  Converting to markdown..."
    (cd "$nb_dir" && uv run jupyter nbconvert \
        --to markdown \
        --output=output.md \
        --TagRemovePreprocessor.enabled=True \
        --TagRemovePreprocessor.remove_cell_tags='["remove_cell"]' \
        --TagRemovePreprocessor.remove_input_tags='["remove_input"]' \
        --TagRemovePreprocessor.remove_all_outputs_tags='["remove_output"]' \
        executed.ipynb)

    # 4. Move generated images
    mkdir -p "$IMAGES_DIR/$slug"
    for img_dir in "$nb_dir"/output_files "$nb_dir"/executed_files "$nb_dir"/notebook_files; do
        if [ -d "$img_dir" ]; then
            cp "$img_dir"/* "$IMAGES_DIR/$slug/" 2>/dev/null || true
        fi
    done

    # 5. Post-process markdown
    echo "  Post-processing..."
    python3 "$REPO_ROOT/scripts/postprocess-markdown.py" \
        --input "$nb_dir/output.md" \
        --output "$OUTPUT_DIR/$slug.md" \
        --slug "$slug"

    # 6. Cleanup
    rm -f "$nb_dir/tagged.ipynb" "$nb_dir/executed.ipynb" "$nb_dir/output.md"
    rm -rf "$nb_dir/output_files" "$nb_dir/executed_files" "$nb_dir/notebook_files"

    echo "  Done: $slug"
    echo
done

echo "=== All notebooks processed ==="
