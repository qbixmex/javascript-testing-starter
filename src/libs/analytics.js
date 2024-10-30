import delay from 'delay';

/**
 * Tracks a page view.
 * @param {string} pagePath The path of the page.
 * 
 * @returns {Promise<void>} A promise that resolves when the page view is tracked.
 */
export async function trackPageView(pagePath) {
  console.log(`Sending analytics...`);
  console.log(`Path: ${pagePath}`);
  await delay(3000);
}
