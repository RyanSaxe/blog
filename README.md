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

## Checks

[prek](https://prek.j178.dev) runs the checks in `.pre-commit-config.yaml` before each commit, and CI runs the same checks on every pull request. Install prek, then install its hook once per clone:

```bash
prek install
```

`prek run --all-files` runs every check on demand:

- oxfmt formats code, styles, Markdown, JSON, YAML and TOML (`.oxfmtrc.json`).
- oxlint lints JavaScript, TypeScript and Astro (`.oxlintrc.json`), and `astro check` type-checks them.
- ruff formats and lints Python, notebooks included, at 80 columns (`ruff.toml`).
- ty type-checks each notebook against its own environment, and each script in `scripts/` against the dependencies it declares inline.
- rumdl lints Markdown (`.rumdl.toml`).
- nbstripout removes notebook outputs.

The notebook build formats each post it generates, so generated posts pass the same checks.

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

Add `draft: true` to the frontmatter while you write. `npm run build` leaves a draft off the published site: it gets no page, it isn't in the RSS feed or the sitemap, other posts' Previous and Next links skip it, and any Writing card that links to it is hidden. `npm run dev` shows drafts like any other post, so you can preview one.

### Notebook post

1. Create a directory in `notebooks/` with a `notebook.ipynb`, a `pyproject.toml` that lists its dependencies plus `jupyter`, `nbconvert` and `ipykernel`, and a `meta.yaml` with the post's `title`, `description`, `date` and `categories` (copy them from `notebooks/linear-nn/`). Start a cell with `# hide`, `# hide_input` or `# hide_output` to leave it, its input or its output out of the post. Citations go in `notebooks/citations.yaml`.
2. Run `npm run build:notebooks` to see it locally, or push to `main` — CI will execute the notebook, generate the markdown, and commit the output

CI uses per-notebook hashing to only re-run notebooks whose source files changed.

Draw figures for a white page: dark text on a white or transparent background. The dark theme inverts them and keeps their hues. A figure drawn on black goes in `DRAWN_ON_BLACK` in `plugins/rehype-essay-figures.mjs`, so the light theme inverts it instead.

### Writing card

A post shows in the Writing section only after you add its card to `src/data/writing.ts`. Copy the `linear-nn` entry, and point its action at `/blog/<slug>/`, where `<slug>` is the post's file name without `.md`. The card's images go in `public/images/site/`, named as `Pic` in `src/data/cards.ts` describes.

## Updating Site Content

- Projects: `src/data/projects.ts`
- Writing (essays, articles and podcasts): `src/data/writing.ts`
- About page career: `src/data/timeline.ts`
- The opening line on every page, the paragraph it opens into, section names and social links: `src/data/site.ts`
- The icon for each social link: `src/components/SocialLinks.astro`, keyed by the link's label
- About page introduction: `src/pages/about.astro`

Images for cards live in `public/images/site/`.

## Notebook Reproducibility

Notebooks are stored without outputs: the nbstripout check removes them before each commit. CI executes them fresh.
