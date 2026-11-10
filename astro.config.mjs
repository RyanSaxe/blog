import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSplitFootnotes from "./plugins/rehype-split-footnotes.mjs";
import rehypeEssayFigures from "./plugins/rehype-essay-figures.mjs";
import rehypeDisplayMath from "./plugins/rehype-display-math.mjs";
import rehypeEssayHeadings from "./plugins/rehype-essay-headings.mjs";
import rehypeMathNowrap from "./plugins/rehype-math-nowrap.mjs";

export default defineConfig({
  site: "https://ryansaxe.com",
  output: "static",
  integrations: [sitemap()],
  redirects: {
    "/blog/": "/writing/",
  },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Inter's three weights are inlined into the stylesheet, so a page always paints in Inter. Loaded as
      // files, a font could arrive just after a new page's first frame, and the text re-wrapped when it did.
      assetsInlineLimit: (file) => (/inter-latin-\d00-normal\.woff2$/.test(file) ? true : undefined),
    },
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeDisplayMath, rehypeKatex, rehypeMathNowrap, rehypeSplitFootnotes, rehypeEssayFigures, rehypeEssayHeadings],
    shikiConfig: {
      // Both themes are emitted as CSS variables; PostLayout picks one per color scheme.
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
