/* Utility functions to fetch, filter, and sort blog posts */
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/* Sorts posts from newest to oldest based on publish date */
const byDateDesc = (a: Post, b: Post) =>
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf();

/* Retrieves all posts that are not marked as drafts */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.filter((p: Post) => !p.data.draft).sort(byDateDesc);
}

/* Retrieves posts for public display and indexing */
/* Filters out drafts and posts specifically hidden from robots */
export async function getVisiblePosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.filter((p: Post) => !p.data.draft && p.data.robot !== false).sort(byDateDesc);
}

/* Returns all visible posts associated with a given tag */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getVisiblePosts();
  return posts.filter((p) => p.data.tags?.includes(tag));
}

/* Retrieves a unique list of all tags used across visible posts */
export async function getAllTags(): Promise<string[]> {
  const posts = await getVisiblePosts();
  return [...new Set(posts.flatMap((p) => p.data.tags ?? []))];
}
