import * as cheerio from 'cheerio';

const url =
  'https://www.mmsports.se/kosttillskott/protein/vassleproteinwhey/body-science-whey-100-403-g.html';

async function scrape() {
  try {
    // Fetch product page HTML
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    const html = await res.text();

    // Extract embedded productJSON from raw HTML
    const start = html.indexOf('var productJSON = ') + 'var productJSON = '.length;
    const end = html.indexOf('};', start) + 1;
    const jsonString = html.slice(start, end);
    const productJSON = JSON.parse(jsonString);

    // Extract base price (default single-unit price)
    const price = productJSON.c_options.price;

    // Get IDs for all variants on product page
    const variantIds = Object.keys(productJSON.variants);

    const products = [];

    for (const variantId of variantIds) {
      const variant = productJSON.variants[variantId][0];

      // Extract HTML description for the variant
      const variantHtml = variant[16];
      const $variant = cheerio.load(variantHtml);

      // Extract product name from <h2>
      const name = $variant('h2').text();

      // Extract weight (e.g. "Nettovikt: 403 g") using regex
      const variantText = $variant.text();
      const weightMatch = variantText.match(/Nettovikt:\s*(\d+)\s*g/i);
      const weightGrams = weightMatch ? Number(weightMatch[1]) : null;

      // Extract protein per 100g from nutrition table
      const proteinRow = $variant('td:contains("Protein")').parent();
      const proteinText = proteinRow.find('td').eq(1).text();
      const proteinPer100g = Number(proteinText.replace(/\D/g, ''));

      // Build normalized product object for our app
      const product = {
        id: `mmsports-${variantId}`,
        name,
        store: 'MMSports',
        price,
        weightGrams,
        proteinPer100g,
      };

      products.push(product);
    }

    console.log('PRODUCTS:', products);
  } catch (error) {
    console.error('Scrape failed:', error.message);
  }
}

scrape();
