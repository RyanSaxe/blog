import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import type { Element, Root } from "hast";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { SKIP, visit } from "unist-util-visit";
import { getPublishedPosts, postHref } from "@/data/published";

const isKatexHtml = (node: Element) =>
  Array.isArray(node.properties.className) && node.properties.className.includes("katex-html");

const isRootRelative = (url: unknown): url is string =>
  typeof url === "string" && url.startsWith("/") && !url.startsWith("//");

/**
 * Rehype plugin that fits a post's HTML to a feed reader, which shows it away from the site and without the
 * site's stylesheets. KaTeX writes each equation as MathML and again as HTML that reads right only with KaTeX's
 * stylesheet, so the feed keeps only the MathML. Root-relative links and images get the site's origin.
 */
function rehypeFeedReader(origin: string) {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (isKatexHtml(node) && parent && index !== undefined) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
      for (const name of ["href", "src"]) {
        const url = node.properties[name];
        if (isRootRelative(url)) node.properties[name] = origin + url;
      }
    });
  };
}

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const toFeedHtml = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeFeedReader, context.site!.origin)
    .use(rehypeStringify);

  const items = posts.map((post) => {
    const content = String(toFeedHtml.processSync(post.rendered?.html ?? ""));

    return {
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: postHref(post),
      content,
      ...(post.data.categories.length > 0 && {
        categories: post.data.categories,
      }),
    };
  });

  return rss({
    title: "Ryan Saxe's Blog",
    description: "ML, engineering, and whatever else.",
    site: context.site!,
    items,
  });
}
