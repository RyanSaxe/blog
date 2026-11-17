// What the site publishes. A build leaves drafts out everywhere; `npm run dev` shows them, so a draft can be previewed.
import { getCollection, type CollectionEntry } from "astro:content";
import type { CardItem } from "./cards";
import { writing } from "./writing";

type Post = CollectionEntry<"blog">;

const isPublished = (post: Post) => import.meta.env.DEV || !post.data.draft;

export const postHref = (post: Post) => `/blog/${post.id}/`;

export const getPublishedPosts = () => getCollection("blog", isPublished);

/** The Writing cards, less any card whose action links to an unpublished post. */
export async function getPublishedWriting(): Promise<CardItem[]> {
  const unpublished = new Set((await getCollection("blog", (post) => !isPublished(post))).map(postHref));
  return writing.filter((card) => !card.actions.some((action) => unpublished.has(action.href)));
}
