import { readFileSync } from "node:fs";
import { join } from "node:path";
import { visit } from "unist-util-visit";

/**
 * Rehype plugin for essay images. A paragraph that holds only an image becomes a
 * <figure class="fig">, so the layout can let figures run wider than the text.
 * Images served from public/ get their intrinsic width and height (so the page
 * does not shift while they load), lazy loading, and async decoding. The notebook
 * export writes alt="png", which a screen reader would announce, so it is cleared.
 * Figures drawn on black are marked .fig-dark, so the light theme can invert them.
 */
const DRAWN_ON_BLACK = new Set(["/images/nam_exerpt.png"]);

export default function rehypeEssayFigures() {
  const publicDir = join(process.cwd(), "public");
  const sizes = new Map();

  function sizeOf(src) {
    if (!sizes.has(src)) sizes.set(src, readPngSize(join(publicDir, decodeURI(src))));
    return sizes.get(src);
  }

  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img") {
        const props = node.properties;
        const src = String(props.src ?? "");
        if (src.startsWith("/") && props.width == null) {
          const size = sizeOf(src);
          if (size) {
            props.width = size.width;
            props.height = size.height;
          }
        }
        if (props.alt === "png") props.alt = "";
        props.loading ??= "lazy";
        props.decoding ??= "async";
        return;
      }

      if (node.tagName !== "p" || !parent || index == null) return;
      const children = node.children.filter((c) => !(c.type === "text" && !c.value.trim()));
      if (children.length !== 1 || children[0].tagName !== "img") return;
      // Very wide figures (a row of three plots) pan sideways on a phone instead of shrinking.
      const src = String(children[0].properties.src ?? "");
      const size = sizeOf(src);
      const wide = size && size.width / size.height > 2.4;
      const className = ["fig", wide && "fig-pan", DRAWN_ON_BLACK.has(src) && "fig-dark"].filter(Boolean);
      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: { className },
        children,
      };
    });
  };
}

/** Width and height from a PNG's IHDR chunk, or undefined for anything else. */
function readPngSize(path) {
  try {
    const buf = readFileSync(path);
    if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return undefined;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return undefined;
  }
}
