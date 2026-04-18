import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from './content/schema';

/**
 * Content Collections Configuration
 * Defines schema and data structure for markdown/mdx content.
 */
const postsCollection = defineCollection({
  // Discovery: Scans the specified directory for markdown and MDX files.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),

  // Validation: Ensures frontmatter integrity and provides type safety across the application.
  schema: ({ image }) => postSchema(image),
});

export const collections = {
  posts: postsCollection,
};
