import { visit } from "unist-util-visit";

/**
 * Rehype plugin that splits the auto-generated footnotes section into
 * separate "Footnotes" and "References" sections. Footnotes have IDs
 * matching `fn-fn-\d+` (from fndetail), everything else is a citation.
 */
export default function rehypeSplitFootnotes() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "section" || !node.properties?.dataFootnotes) return;

      const ol = node.children.find((c) => c.tagName === "ol");
      if (!ol) return;

      const items = ol.children.filter((c) => c.tagName === "li");
      const fnItems = [];
      const refItems = [];

      for (const li of items) {
        const id = li.properties?.id || "";
        if (/fn-fn-\d+/.test(id)) {
          fnItems.push(li);
        } else {
          refItems.push(li);
        }
      }

      const sections = [];

      if (fnItems.length > 0) {
        sections.push({ type: "element", tagName: "hr", properties: {}, children: [] });
        sections.push({
          type: "element",
          tagName: "section",
          properties: { className: ["footnotes"] },
          children: [
            { type: "element", tagName: "h2", properties: {}, children: [{ type: "text", value: "Footnotes" }] },
            { type: "element", tagName: "ol", properties: {}, children: fnItems },
          ],
        });
      }

      if (refItems.length > 0) {
        sections.push({ type: "element", tagName: "hr", properties: {}, children: [] });
        sections.push({
          type: "element",
          tagName: "section",
          properties: { className: ["references"] },
          children: [
            { type: "element", tagName: "h2", properties: {}, children: [{ type: "text", value: "References" }] },
            { type: "element", tagName: "ol", properties: {}, children: refItems },
          ],
        });
      }

      parent.children.splice(index, 1, ...sections);
    });
  };
}
