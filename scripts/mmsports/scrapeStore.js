import fs from 'fs';
import { scrapeCategoryPage } from './scrapeCategoryPage.js';
import { scrapeProductPage } from './scrapeProductPage.js';

const CATEGORY_URL = 'https://www.mmsports.se/kosttillskott/protein/';
const OUTPUT_FILE = 'data/mmsports-products.json';

async function scrapeStore() {
  try {
    // Get all relevant product links from MMSports protein page
    const productLinks = await scrapeCategoryPage(CATEGORY_URL);

    console.log(`Found ${productLinks.length} product links`);

    const allProducts = [];

    // Scrape each product page and collect all variants
    for (const link of productLinks) {
      console.log(`Scraping ${link}`);

      const products = await scrapeProductPage(link);
      allProducts.push(...products);
    }

    // Save final result to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2));

    console.log(`Saved ${allProducts.length} products to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Store scrape failed:', error.message);
  }
}

await scrapeStore();
