/* ─────────────────────────────────────────────────────────────────────────── */
/* Content Collections Configuration                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import type { ImageFunction } from 'astro:content';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Post Schema Definition                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

const postSchema = (image: ImageFunction) =>
  z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    robot: z.boolean().default(true),
    type: z.enum(['website', 'article', 'profile']).default('article'),
  });

/* ─────────────────────────────────────────────────────────────────────────── */
/* Posts Collection Definition                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

const postsCollection = defineCollection({
  /* Loads markdown and mdx files from the posts directory */
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),

  /* Validates post frontmatter against the schema */
  schema: ({ image }) => postSchema(image),
});

export const collections = {
  posts: postsCollection,
};
