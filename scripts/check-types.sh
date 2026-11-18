#!/usr/bin/env bash
# Type-checks the Python files it is given, each against the environment it
# runs in: a notebook against its folder's uv project, and a script against
# the dependencies it declares inline.
set -euo pipefail

TY=ty@0.0.105

check_notebook() {
  local dir=$1
  uv sync --project "$dir" --quiet || return 1
  uvx "$TY" check --python "$dir/.venv" "$dir/notebook.ipynb"
}

check_script() {
  local script=$1
  uv sync --script "$script" --quiet || return 1
  uvx "$TY" check --python "$(uv python find --script "$script")" "$script"
}

# Each check returns its own status: a function called before `||` runs
# without `set -e`, so a failed sync would otherwise go unnoticed.
status=0
for dir in $(printf '%s\n' "$@" | sed -n 's|^\(notebooks/[^/]*\)/.*|\1|p' | sort -u); do
  check_notebook "$dir" || status=1
done
for script in $(printf '%s\n' "$@" | grep '^scripts/.*\.py$' || true); do
  check_script "$script" || status=1
done
exit "$status"
