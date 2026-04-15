import * as cheerio from 'cheerio';

const BASE_URL = 'https://www.mmsports.se';
// Only include relevant protein categories (v1 scope)
const ALLOWED_CATEGORIES = ['vassleproteinwhey', 'isolat', 'vegetariskt-protein', 'proteinpulver'];

export async function scrapeCategoryPage(url) {
  try {
    // Fetch category page HTML
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const links = [];

    // Extract all anchor links from page
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (!href) return;
      // Must be product page
      if (!href.endsWith('.html')) return;
      // Must be inside protein section
      if (!href.toLowerCase().includes('/kosttillskott/protein/')) return;
      // Must match one of allowed categories
      const isAllowed = ALLOWED_CATEGORIES.some((category) =>
        href.toLowerCase().includes(category)
      );
      if (!isAllowed) return;

      // Ensure full URL (handles relative paths)
      const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

      links.push(fullUrl);
    });

    // Remove duplicate links
    const uniqueLinks = [...new Set(links)];

    return uniqueLinks;
  } catch (error) {
    console.error('Category scrape failed:', error.message);
    return [];
  }
}

// Temporary test run
const testUrl = 'https://www.mmsports.se/kosttillskott/protein/';

const links = await scrapeCategoryPage(testUrl);

console.log('Found links:', links.length);
console.log(links.slice(0, 10));
