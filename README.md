# Ryan Saxe's Blog

Personal blog at [ryansaxe.com](https://ryansaxe.com).

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Blog posts from notebooks are generated in CI and committed to the repo, so they're available locally without any extra steps.

Links within the site swap pages in place through Astro's client router, so a script in a page or component runs once, not on every page. Start page scripts with `onPage` from `src/scripts/page.ts`, which runs them again after each swap and removes their listeners when the page leaves.

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

1. Create a directory in `notebooks/` with a `notebook.ipynb`, a `pyproject.toml` that lists its dependencies plus `jupyter`, `nbconvert` and `ipykernel`, and a `meta.yaml` with the post's `title`, `description`, `date` and `categories` (copy them from `notebooks/linear-nn/`). Start a cell with `#hide`, `#hide_input` or `#hide_output` to leave it, its input or its output out of the post. Citations go in `notebooks/citations.yaml`.
2. Run `npm run build:notebooks` to see it locally, or push to `main` — CI will execute the notebook, generate the markdown, and commit the output

CI uses per-notebook hashing to only re-run notebooks whose source files changed.

Draw figures for a white page: dark text on a white or transparent background. The dark theme inverts them and keeps their hues. A figure drawn on black goes in `DRAWN_ON_BLACK` in `plugins/rehype-essay-figures.mjs`, so the light theme inverts it instead.

## Updating Site Content

- Projects: `src/data/projects.ts`
- Writing (essays, articles and podcasts): `src/data/writing.ts`
- About page career: `src/data/timeline.ts`
- The opening line on every page, the paragraph it opens into, section names and social links: `src/data/site.ts`
- About page introduction: `src/pages/about.astro`

Images for cards live in `public/images/site/`.

## Notebook Reproducibility

Notebooks are stored without outputs (via nbstripout). CI executes them fresh, guaranteeing reproducibility. To set up nbstripout locally:

```bash
uvx nbstripout --install --attributes .gitattributes
```
