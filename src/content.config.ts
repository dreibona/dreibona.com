/* Content collections configuration */
/* Defines how content files are loaded and validated */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from './content/schema';

const postsCollection = defineCollection({
  /* Loads markdown and mdx files from the posts directory */
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),

  /* Validates post frontmatter against the schema */
  schema: ({ image }) => postSchema(image),
});

export const collections = {
  posts: postsCollection,
};
