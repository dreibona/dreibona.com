import { z } from 'astro/zod';

/**
 * Post Schema
 * Defines the structure of frontmatter for blog posts.
 * Extracted to a standalone file for reuse in CLI tools or external validation scripts.
 */
export const postSchema = (image: any) =>
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
