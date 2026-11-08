import { visit } from "unist-util-visit";

/**
 * Rehype plugin, run before rehype-katex. remark-math reads `$$x$$` written on one line as
 * inline math, but the essays use that form for equations that stand alone in their own
 * paragraph. Mark such equations as display math so KaTeX centers them and draws them at
 * display size.
 */
export default function rehypeDisplayMath() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "p") return;
      const children = node.children.filter((c) => !(c.type === "text" && !c.value.trim()));
      if (children.length !== 1) return;
      const [only] = children;
      const classes = only.properties?.className;
      if (only.tagName !== "code" || !Array.isArray(classes) || !classes.includes("math-inline")) return;
      only.properties.className = [...classes.filter((c) => c !== "math-inline"), "math-display"];
    });
  };
}
