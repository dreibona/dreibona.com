/* ─────────────────────────────────────────────────────────────────────────── */
/* UI string translations for all supported locales                            */
/* ─────────────────────────────────────────────────────────────────────────── */

import type { Locale } from './locales';

const ui = {
  en: {
    'nav.home': 'db',
    'nav.lab': 'Lab',
    'nav.about': 'About',
    'nav.now': 'Now',
    'lab.title': 'Lab',
    'lab.backToLab': '← Back to Lab',
    'lab.postCount.one': 'post',
    'lab.postCount.many': 'posts',
    'pagination.prev': 'Previous page',
    'pagination.next': 'Next page',
    'post.readingTime': 'min read',
    'footer.by': 'design & code by',
    'skip.link': 'Skip to content',
    '404.title': '404 — Page Not Found',
    '404.description': 'The page you are looking for does not exist or has been moved.',
    '404.heading': '404',
    '404.subtitle': 'Page Not Found',
    '404.body': "The page you are looking for doesn't exist or has been moved.",
    '404.back': '← Return to Home',
    'tag.metaTitle.prefix': 'Posts with tag',
    'tag.metaDescription.prefix': 'All articles tagged with',
    'tag.page': 'Page',
    'pagination.page': 'Page',
    'nav.homeLabel': 'Home',
    'pagination.label': 'Pagination',
  },
  'es-ES': {
    'nav.home': 'db',
    'nav.lab': 'Lab',
    'nav.about': 'Sobre',
    'nav.now': 'Ahora',
    'lab.title': 'Lab',
    'lab.backToLab': '← Volver al Lab',
    'lab.postCount.one': 'artículo',
    'lab.postCount.many': 'artículos',
    'pagination.prev': 'Página anterior',
    'pagination.next': 'Página siguiente',
    'post.readingTime': 'min de lectura',
    'footer.by': 'diseño & código por',
    'skip.link': 'Ir al contenido',
    '404.title': '404 — Página no encontrada',
    '404.description': 'La página que buscas no existe o ha sido movida.',
    '404.heading': '404',
    '404.subtitle': 'Página no encontrada',
    '404.body': 'La página que buscas no existe o ha sido movida.',
    '404.back': '← Volver al inicio',
    'tag.metaTitle.prefix': 'Artículos con etiqueta',
    'tag.metaDescription.prefix': 'Todos los artículos con etiqueta',
    'tag.page': 'Página',
    'pagination.page': 'Página',
    'nav.homeLabel': 'Inicio',
    'pagination.label': 'Paginación',
  },
  'pt-BR': {
    'nav.home': 'db',
    'nav.lab': 'Lab',
    'nav.about': 'Sobre',
    'nav.now': 'Agora',
    'lab.title': 'Lab',
    'lab.backToLab': '← Voltar ao Lab',
    'lab.postCount.one': 'artigo',
    'lab.postCount.many': 'artigos',
    'pagination.prev': 'Página anterior',
    'pagination.next': 'Próxima página',
    'post.readingTime': 'min de leitura',
    'footer.by': 'design & código por',
    'skip.link': 'Pular para o conteúdo',
    '404.title': '404 — Página não encontrada',
    '404.description': 'A página que você busca não existe ou foi movida.',
    '404.heading': '404',
    '404.subtitle': 'Página não encontrada',
    '404.body': 'A página que você busca não existe ou foi movida.',
    '404.back': '← Voltar ao início',
    'tag.metaTitle.prefix': 'Artigos com etiqueta',
    'tag.metaDescription.prefix': 'Todos os artigos com etiqueta',
    'tag.page': 'Página',
    'pagination.page': 'Página',
    'nav.homeLabel': 'Início',
    'pagination.label': 'Paginação',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

/* Returns a translation function for the given locale */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return (
      (ui[locale] as Record<string, string>)[key] ??
      (ui['en'] as Record<string, string>)[key] ??
      key
    );
  };
}
