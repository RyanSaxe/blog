import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const siteUrl = context.site!.origin;

  const items = posts.map((post) => {
    const html = post.rendered?.html ?? "";
    const content = html.replace(/src="\//g, `src="${siteUrl}/`);

    return {
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
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
