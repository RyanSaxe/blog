import { visit } from "unist-util-visit";

/**
 * Rehype plugin that keeps inline math on one line with the characters touching it, such as the
 * period after it or the parenthesis before it, so a line never starts with "." or ")".
 * Run it after rehype-katex.
 */
export default function rehypeMathNowrap() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent || index == null || !isInlineMath(node)) return;
      const prev = parent.children[index - 1];
      const next = parent.children[index + 1];
      const before = prev?.type === "text" ? prev.value.match(/\S+$/)?.[0] : undefined;
      const after = next?.type === "text" ? next.value.match(/^\S+/)?.[0] : undefined;
      if (!before && !after) return;
      const kept = [node];
      if (before) {
        prev.value = prev.value.slice(0, -before.length);
        kept.unshift({ type: "text", value: before });
      }
      if (after) {
        next.value = next.value.slice(after.length);
        kept.push({ type: "text", value: after });
      }
      parent.children[index] = { type: "element", tagName: "span", properties: { className: ["math-nowrap"] }, children: kept };
      return index + 1;
    });
  };
}

function isInlineMath(node) {
  const cls = node.properties?.className;
  return node.tagName === "span" && Array.isArray(cls) && cls.includes("katex");
}
