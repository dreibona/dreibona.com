/**
 * Reading Time Utility
 * Provides an estimation of how long it takes to read a given piece of text.
 * Calculates estimated reading time based on an average of 200 words per minute.
 */
export function getReadingTime(text: string): string {
  if (!text || typeof text !== 'string') {
    return '1 min read';
  }

  // Strip HTML tags and count words using Unicode letters
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, '');
  const words = plainText.match(/\p{L}+/gu);
  const wordCount = words ? words.length : 0;

  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}
