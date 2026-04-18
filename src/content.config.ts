import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content Collections Configuration
 * Defines schema and data structure for markdown/mdx content.
 */
const postsCollection = defineCollection({
  // Discovery: Scans the specified directory for markdown and MDX files.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),

  // Validation: Ensures frontmatter integrity and provides type safety across the application.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string(),
      // Coercion: Automatically converts frontmatter strings into JavaScript Date objects.
      publishDate: z.coerce.date(),
      modifiedDate: z.coerce.date().optional(),

      // Image Processing: Resolves local asset paths to optimized metadata via Astro's image service.
      image: image().optional(),
      imageAlt: z.string().optional(),

      tags: z.array(z.string()).default([]),

      // Defaults: Applies safe fallbacks for optional frontmatter properties.
      draft: z.boolean().default(false),
      robot: z.boolean().default(true),
      type: z.enum(['website', 'article', 'profile']).default('article'),
    }),
});

export const collections = {
  posts: postsCollection,
};
