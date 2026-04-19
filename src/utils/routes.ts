/* ─────────────────────────────────────────────────────────────────────────── */
/* Utility functions to fetch, filter, sort blog posts, and generate routes   */
/* Centralizes all post-related logic and static path generation for pages    */
/* ─────────────────────────────────────────────────────────────────────────── */
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { GetStaticPathsItem } from 'astro';
import type { Locale } from '@/i18n/locales';
import { extractLocaleFromId, extractPostSlug } from '@/i18n/utils';

export type PostEntry = CollectionEntry<'posts'>;

/* Sorts posts from newest to oldest based on publish date */
export const byDateDesc = (a: PostEntry, b: PostEntry) =>
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf();

/* Retrieves all published posts for the given locale */
export async function getPublishedPosts(locale: Locale): Promise<PostEntry[]> {
  const posts = await getCollection('posts');
  return posts
    .filter((p: PostEntry) => !p.data.draft && extractLocaleFromId(p.id) === locale)
    .sort(byDateDesc);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Retrieves posts for public display and indexing                             */
/* Filters out drafts and posts specifically hidden from robots                */
/* ─────────────────────────────────────────────────────────────────────────── */
export async function getVisiblePosts(locale: Locale): Promise<PostEntry[]> {
  const posts = await getPublishedPosts(locale);
  return posts.filter((p) => p.data.robot !== false);
}

/* Returns all visible posts associated with a given tag for the given locale */
export async function getPostsByTag(tag: string, locale: Locale): Promise<PostEntry[]> {
  const posts = await getVisiblePosts(locale);
  return posts.filter((p) => p.data.tags?.includes(tag));
}

/* Retrieves a unique list of all tags used across visible posts for the given locale */
export async function getAllTags(locale: Locale): Promise<string[]> {
  const posts = await getVisiblePosts(locale);
  return [...new Set(posts.flatMap((p) => p.data.tags ?? []))];
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Static paths generation functions for Astro pages                           */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Generates static paths for the main lab listing page with pagination */
export async function getLabStaticPaths(
  paginate: any,
  locale: Locale,
): Promise<GetStaticPathsItem[]> {
  const posts = await getPublishedPosts(locale);
  return paginate(posts, { pageSize: 10 });
}

/* Generates static paths for individual post detail pages */
/* params.id is the slug without locale prefix (e.g. 'post-1') */
export async function getPostDetailStaticPaths(locale: Locale): Promise<GetStaticPathsItem[]> {
  const posts = await getPublishedPosts(locale);
  return posts.map((entry) => ({
    params: { id: extractPostSlug(entry.id) },
    props: { entry },
  }));
}

/* Generates static paths for tag listing pages with pagination */
export async function getTagStaticPaths(
  paginate: any,
  locale: Locale,
): Promise<GetStaticPathsItem[]> {
  const tags = await getAllTags(locale);
  return (
    await Promise.all(
      tags.map(async (tag) => {
        const posts = await getPostsByTag(tag, locale);
        return paginate(posts, { params: { tag }, pageSize: 10 });
      }),
    )
  ).flat();
}
