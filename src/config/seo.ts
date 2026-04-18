/**
 * SEO Engine
 * Handles Meta Tag generation and JSON-LD Schema Markup.
 * Merges 'siteConfig' with page-specific overrides.
 */
import { siteConfig } from './site';
import type { ImageMetadata } from 'astro';

export interface PostMeta {
  title?: string;
  description?: string;
  author?: string;
  image?: ImageMetadata | string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  robot?: boolean;
  publishDate?: Date;
  modifiedDate?: Date;
}

export interface HeadMeta {
  title: string;
  pageTitle: string;
  description: string;
  author: string;
  image: { url: string; alt: string };
  baseSite: string;
  loc: string;
  type: string;
  robot: string;
  currentUrl: string;
  publishDate?: string;
  modifiedDate?: string;
}

/**
 * Resolves final metadata for a page by merging page-level overrides with global defaults.
 * This ensures all pages maintain consistent SEO headers regardless of individual content completeness.
 * @param pageMeta - Specific metadata from page frontmatter or props.
 * @param url - Current Astro.url object for canonical and absolute path resolution.
 */
export const getMeta = (pageMeta: PostMeta = {}, url: URL): HeadMeta => {
  const { pathname, href } = url;

  // Robots: Modern directives for LLMs and Search Engines.
  // 'max-snippet:-1' is specifically used to allow AI agents to generate rich summaries from site content.
  const isRobotEnabled = pageMeta.robot ?? siteConfig.robots;
  const robotString = isRobotEnabled
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow';

  // Image Resolution: Handles Astro's 'ImageMetadata' objects from local assets or standard string URLs.
  const imgSrc =
    typeof pageMeta.image === 'string'
      ? pageMeta.image
      : (pageMeta.image?.src ?? siteConfig.defaultImage);

  const imgAlt = pageMeta.imageAlt ?? pageMeta.title ?? siteConfig.defaultImageAlt;

  const title = pageMeta.title ?? siteConfig.title;
  const type = pageMeta.type ?? 'website';

  // Title Hierarchy Logic:
  // 1. If article: Title — Site Name
  // 2. If custom title: Title — Site Name
  // 3. Fallback: Automatically extract and capitalize the last URL segment.
  let pageTitle = siteConfig.title;
  if (type === 'article' && pageMeta.title) {
    pageTitle = `${pageMeta.title} — ${siteConfig.name}`;
  } else if (pageMeta.title && pageMeta.title !== siteConfig.title) {
    pageTitle = `${pageMeta.title} — ${siteConfig.name}`;
  } else {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      const navPage = segments[segments.length - 1];
      const capitalized = navPage.charAt(0).toUpperCase() + navPage.slice(1);
      pageTitle = `${capitalized} — ${siteConfig.name}`;
    }
  }

  return {
    title,
    pageTitle,
    description: pageMeta.description ?? siteConfig.description,
    author: pageMeta.author ?? siteConfig.author,
    image: { url: imgSrc, alt: imgAlt },
    baseSite: siteConfig.url,
    loc: siteConfig.locale,
    type,
    robot: robotString,
    currentUrl: href,
    publishDate: pageMeta.publishDate ? pageMeta.publishDate.toISOString() : undefined,
    modifiedDate: pageMeta.modifiedDate ? pageMeta.modifiedDate.toISOString() : undefined,
  };
};

/**
 * Generates JSON-LD structured data to improve E-E-A-T and semantic indexing.
 * Uses a '@graph' approach to link BreadcrumbList and Article/WebSite entities.
 * Injected as a single script tag in the HTML head.
 */
export const getSchema = (meta: HeadMeta): string => {
  const isArticle = meta.type === 'article';
  const imageUrl = new URL(meta.image.url, meta.baseSite).toString();

  const authorSchema = {
    '@type': 'Person',
    name: meta.author,
    url: meta.baseSite,
  };

  const baseSchema = {
    '@type': isArticle ? 'Article' : 'WebSite',
    name: meta.title,
    url: meta.currentUrl,
    description: meta.description,
    author: authorSchema,
  };

  // Breadcrumb Logic: Dynamically builds the hierarchy based on the URL path.
  const urlObj = new URL(meta.currentUrl);
  const segments = urlObj.pathname.split('/').filter(Boolean);
  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: meta.baseSite,
      },
      ...segments.map((segment, index) => {
        const path = segments.slice(0, index + 1).join('/');
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          item: new URL(`/${path}/`, meta.baseSite).toString(),
        };
      }),
    ],
  };

  const schemaGraph: any[] = [breadcrumbList];

  if (isArticle) {
    schemaGraph.push({
      ...baseSchema,
      headline: meta.pageTitle,
      image: [imageUrl],
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
          '@type': 'ImageObject',
          url: new URL(siteConfig.defaultImage, meta.baseSite).toString(),
        },
      },
      datePublished: meta.publishDate,
      dateModified: meta.modifiedDate ?? meta.publishDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': meta.currentUrl,
      },
    });
  } else {
    schemaGraph.push({
      ...baseSchema,
      publisher: authorSchema,
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  });
};
