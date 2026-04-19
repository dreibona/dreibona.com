/* ─────────────────────────────────────────────────────────────────────────── */
/* Utility to calculate the estimated reading time of a text string            */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Returns a formatted string (e.g., "5 min read") */
export function getReadingTime(text: string): string {
  if (!text) {
    return '1 min read';
  }

  /* Remove HTML tags and count words using Unicode-aware matching */
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, '');
  const words = plainText.match(/\p{L}+/gu);
  const wordCount = words ? words.length : 0;

  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}
