import type { ImageMetadata } from 'astro';
import cover from '../assets/cover.jpg';

// --- Dates --- //
const now = new Date();
const year = now.getUTCFullYear();
export const formatDate = (date: Date) => {
  const d = date.getUTCDate().toString().padStart(2, '0');
  const m = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const y = date.getUTCFullYear();
  return `${d}/${m}/${y}`;
};
const date = formatDate(now);
// --- Interfaces --- //
export interface PostMeta {
  title?: string;
  description?: string;
  author?: string;
  image?: ImageMetadata;
  imageAlt?: string;
  type?: string;
  robot?: boolean;
}

export interface HeadMeta {
  title: string;
  pageTitle: string;
  description: string;
  author: string;
  image: { url: string; alt: string };
  imageAlt?: string;
  baseSite: string;
  loc: string;
  type: string;
  robot: string;
  currentUrl: string;
}
// --- Fallback --- //
export const config = {
  meta: {
    title: 'title config',
    description: 'description config',
    author: 'author config',
    image: {
      url: cover.src,
      alt: 'alt config',
    },
    baseSite: 'https://dreibona.com/',
    loc: 'en',
    type: 'website',
    robot: true,
  },
  nav: [{ page: '/lab/' }, { page: '/about/' }, { page: '/now/' }],
  year,
  date,
};
// --- Fallback Function --- //
export const getMeta = (pageMeta: PostMeta = {}, url: URL): HeadMeta => {
  const { meta: cfg } = config;
  const { pathname, href } = url;
  // Robots
  const robotEnabled = pageMeta.robot !== undefined ? pageMeta.robot : cfg.robot;
  const robotString = robotEnabled ? 'index, follow, noimageindex' : 'none';
  // Images
  const processImg = (): { url: string; alt: string } => {
    const img = pageMeta.image;
    const alt = pageMeta.imageAlt || pageMeta.title || cfg.image.alt;

    if (!img) return cfg.image;

    return {
      url: img.src,
      alt,
    };
  };
  // Titles
  const segments = pathname.split('/').filter(Boolean);
  const title = pageMeta.title || cfg.title;
  const type = pageMeta.type || cfg.type;
  let pageTitle = cfg.title;
  if (type === 'article') {
    pageTitle = `${title} — ${cfg.title}`; // Title Post — Title Config
  } else if (pageMeta.title && pageMeta.title !== cfg.title) {
    pageTitle = `${cfg.title} — ${pageMeta.title}`; // Title Config — Manual Title
  } else if (segments.length > 0) {
    const navPage = segments[segments.length - 1]; // Title Config — Meta Nav Page [line: 51]
    pageTitle = `${cfg.title} — ${navPage}`;
  }
  return {
    title,
    pageTitle,
    description: pageMeta.description || cfg.description,
    author: pageMeta.author || cfg.author,
    image: processImg(),
    baseSite: cfg.baseSite,
    loc: cfg.loc,
    type,
    robot: robotString,
    currentUrl: href,
  };
};

export type Config = typeof config;
