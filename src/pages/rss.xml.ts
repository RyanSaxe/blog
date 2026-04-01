import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      // Render to string isn't directly available, so use description + link
      // Full content RSS requires experimental container API or a workaround
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${post.id}/`,
      };
    }),
  );

  return rss({
    title: "Ryan Saxe's Blog",
    description: "ML, engineering, and whatever else.",
    site: context.site!,
    items,
  });
}
