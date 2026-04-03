# Ryan Saxe's Blog

Personal blog at [ryansaxe.com](https://ryansaxe.com).

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Blog posts from notebooks are generated in CI and committed to the repo, so they're available locally without any extra steps.

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
2. Push to `main` — CI will execute the notebook, generate the markdown, and commit the output

CI uses per-notebook hashing to only re-run notebooks whose source files changed.

## Updating the About Page

Edit `src/data/timeline.ts` and `src/data/projects.ts`.

## Notebook Reproducibility

Notebooks are stored without outputs (via nbstripout). CI executes them fresh, guaranteeing reproducibility. To set up nbstripout locally:

```bash
uvx nbstripout --install --attributes .gitattributes
```
