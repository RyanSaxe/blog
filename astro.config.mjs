import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSplitFootnotes from "./plugins/rehype-split-footnotes.mjs";

export default defineConfig({
  site: "https://ryansaxe.com",
  output: "static",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSplitFootnotes],
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
});
