/* ─────────────────────────────────────────────────────────────────────────── */
/* SEO engine to manage metadata and structured data generation                */
/* ─────────────────────────────────────────────────────────────────────────── */
import { siteConfig } from './site';
import { buildPageTitle, formatSegmentName } from '@/utils/titleBuilder';
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

/* ─────────────────────────────────────────────────────────────────────────── */
/* Merges page-specific overrides with global site defaults                    */
/* ─────────────────────────────────────────────────────────────────────────── */
export const getMeta = (pageMeta: PostMeta = {}, url: URL): HeadMeta => {
  const { pathname, href } = url;

  const isRobotEnabled = pageMeta.robot ?? siteConfig.robots;
  const robot = isRobotEnabled
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow';

  /* Determines image URL from either Astro metadata or string path */
  const imageUrl =
    typeof pageMeta.image === 'string'
      ? pageMeta.image
      : (pageMeta.image?.src ?? siteConfig.defaultImage);

  const title = pageMeta.title ?? siteConfig.title;
  const type = pageMeta.type ?? 'website';
  const pageTitle = buildPageTitle(pageMeta.title, pathname, siteConfig.name, siteConfig.title);

  return {
    title,
    pageTitle,
    description: pageMeta.description ?? siteConfig.description,
    author: pageMeta.author ?? siteConfig.author,
    image: {
      url: imageUrl,
      alt: pageMeta.imageAlt ?? title,
    },
    baseSite: siteConfig.url,
    loc: siteConfig.locale,
    type,
    robot,
    currentUrl: href,
    publishDate: pageMeta.publishDate?.toISOString(),
    modifiedDate: pageMeta.modifiedDate?.toISOString(),
  };
};

interface SchemaNode {
  '@type': string;
  [key: string]: unknown;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Generates JSON-LD structured data for search engine optimization           */
/* ─────────────────────────────────────────────────────────────────────────── */
export const getSchema = (meta: HeadMeta): string => {
  const isArticle = meta.type === 'article';
  const imageUrl = new URL(meta.image.url, meta.baseSite).toString();

  const author: SchemaNode = {
    '@type': 'Person',
    name: meta.author,
    url: meta.baseSite,
  };

  /* Build breadcrumb navigation items from the current URL path */
  const segments = new URL(meta.currentUrl).pathname.split('/').filter(Boolean);
  const breadcrumb: SchemaNode = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: meta.baseSite },
      ...segments.map((seg, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: formatSegmentName(seg),
        item: new URL(`/${segments.slice(0, i + 1).join('/')}/`, meta.baseSite).toString(),
      })),
    ],
  };

  /* Defines the main entity as either an Article or a WebSite */
  const entity: SchemaNode = isArticle
    ? {
        '@type': 'Article',
        headline: meta.pageTitle,
        url: meta.currentUrl,
        description: meta.description,
        image: [imageUrl],
        author,
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
        mainEntityOfPage: { '@type': 'WebPage', '@id': meta.currentUrl },
      }
    : {
        '@type': 'WebSite',
        name: meta.title,
        url: meta.currentUrl,
        description: meta.description,
        author,
        publisher: author,
      };

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [breadcrumb, entity],
  });
};
