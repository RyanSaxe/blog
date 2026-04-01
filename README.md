# Opening the Black Box

Personal blog at [ryansaxe.com](https://ryansaxe.com) — explaining and exploring how machines learn.

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Local Development

```bash
# Install dependencies
npm install

# Build notebook posts (requires Python 3.10-3.12 + uv)
npm run build:notebooks

# Start dev server
npm run dev

# Full build (notebooks + site)
npm run build:full

# Preview production build
npm run build:full && npm run preview
```

## Adding a New Post

### Markdown post

Create a `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Title"
description: "A short description"
date: 2024-01-15
categories: ["topic"]
---

Your content here...
```

### Notebook post

1. Create a directory in `notebooks/` with a `pyproject.toml` and `notebook.ipynb`
2. Add a gitignore entry for the generated markdown in `src/content/blog/`
3. Run `npm run build:notebooks` to convert

## Updating the About Page

Edit `src/data/timeline.ts` to add or modify timeline entries.

## Notebook Reproducibility

Notebooks are stored without outputs (via nbstripout). CI executes them fresh on every deploy, guaranteeing reproducibility. To set up nbstripout locally:

```bash
uvx nbstripout --install --attributes .gitattributes
```
