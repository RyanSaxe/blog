import { visit } from "unist-util-visit";

/**
 * Rehype plugin that turns an essay's top-level headings (# in the notebook) into h2, so the
 * page title stays the only h1 and every section heading looks the same, whichever level the
 * notebook used for it.
 */
export default function rehypeEssayHeadings() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "h1") node.tagName = "h2";
    });
  };
}
