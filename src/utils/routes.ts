/* ─────────────────────────────────────────────────────────────────────────── */
/* Utility functions to fetch, filter, sort blog posts, and generate routes   */
/* Centralizes all post-related logic and static path generation for pages    */
/* ─────────────────────────────────────────────────────────────────────────── */
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { GetStaticPathsItem } from 'astro';

export type PostEntry = CollectionEntry<'posts'>;

/* Sorts posts from newest to oldest based on publish date */
export const byDateDesc = (a: PostEntry, b: PostEntry) =>
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf();

/* Retrieves all posts that are not marked as drafts */
export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts');
  return posts.filter((p: PostEntry) => !p.data.draft).sort(byDateDesc);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Retrieves posts for public display and indexing                             */
/* Filters out drafts and posts specifically hidden from robots                */
/* ─────────────────────────────────────────────────────────────────────────── */
export async function getVisiblePosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts');
  return posts.filter((p: PostEntry) => !p.data.draft && p.data.robot !== false).sort(byDateDesc);
}

/* Returns all visible posts associated with a given tag */
export async function getPostsByTag(tag: string): Promise<PostEntry[]> {
  const posts = await getVisiblePosts();
  return posts.filter((p) => p.data.tags?.includes(tag));
}

/* Retrieves a unique list of all tags used across visible posts */
export async function getAllTags(): Promise<string[]> {
  const posts = await getVisiblePosts();
  return [...new Set(posts.flatMap((p) => p.data.tags ?? []))];
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Route generation functions for static site generation                       */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Generates paginated routes for the main blog list */
export async function getLabRoutes(paginate: any): Promise<GetStaticPathsItem[]> {
  const posts = await getPublishedPosts();
  return paginate(posts, { pageSize: 10 });
}

/* Generates paginated routes for the tag list */
export async function getTagRoutes(paginate: any): Promise<GetStaticPathsItem[]> {
  const tags = await getAllTags();
  return (
    await Promise.all(
      tags.map(async (tag) => {
        const posts = await getPostsByTag(tag);
        return paginate(posts, { params: { tag }, pageSize: 10 });
      }),
    )
  ).flat();
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Static paths generation functions for Astro pages                           */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Generates static paths for the main lab listing page with pagination */
export async function getLabStaticPaths(paginate: any): Promise<GetStaticPathsItem[]> {
  return await getLabRoutes(paginate);
}

/* Generates static paths for individual post detail pages */
export async function getPostDetailStaticPaths(): Promise<GetStaticPathsItem[]> {
  const posts = await getPublishedPosts();
  return posts.map((entry) => ({
    params: { id: entry.id },
    props: { entry },
  }));
}

/* Generates static paths for tag listing pages with pagination */
export async function getTagStaticPaths(paginate: any): Promise<GetStaticPathsItem[]> {
  return await getTagRoutes(paginate);
}
