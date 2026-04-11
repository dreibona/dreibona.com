import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      author: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      robot: z.boolean(),
      type: z.string(),
    }),
});

export const collections = {
  posts: postsCollection,
};
