import * as cheerio from 'cheerio';

function getWeightFromSizeText(variantInfoText) {
  const kgMatch = variantInfoText.match(/Storlek:\s*(\d+(?:[.,]\d+)?)\s*kg/i);

  if (kgMatch) {
    return Math.round(parseFloat(kgMatch[1].replace(',', '.')) * 1000);
  }

  const gramMatch = variantInfoText.match(/Storlek:\s*(\d+)\s*g/i);

  if (gramMatch) {
    return Number(gramMatch[1]);
  }

  return null;
}

function getNetWeightValues(variantText) {
  const netWeightSectionMatch = variantText.match(/Nettovikt:\s*([^.]*)/i);

  if (!netWeightSectionMatch) {
    return [];
  }

  const netWeightText = netWeightSectionMatch[1];
  const matches = [...netWeightText.matchAll(/(\d+)\s*(?:g|gram)/gi)];

  return matches.map((match) => Number(match[1]));
}

function getClosestValue(values, target) {
  if (!values.length) {
    return null;
  }

  let closest = values[0];

  for (const value of values) {
    if (Math.abs(value - target) < Math.abs(closest - target)) {
      closest = value;
    }
  }

  return closest;
}

function getPackMultiplier(name, url) {
  const text = `${name} ${url}`.toLowerCase();

  const match = text.match(/(\d+)\s*[-]?\s*st/);

  if (match) {
    return Number(match[1]);
  }

  return 1;
}

function getWeightGrams({ variantInfoText, variantText, name, url }) {
  const weightFromSizeText = getWeightFromSizeText(variantInfoText);
  const netWeightValues = getNetWeightValues(variantText);

  let weightGrams = null;

  // If there is one clear net weight, use it
  if (netWeightValues.length === 1) {
    weightGrams = netWeightValues[0];
  } else if (netWeightValues.length > 1 && weightFromSizeText) {
    // If there are multiple net weights, pick the one closest to "Storlek"
    weightGrams = getClosestValue(netWeightValues, weightFromSizeText);
  } else if (weightFromSizeText) {
    // If no usable net weight exists, fall back to "Storlek"
    weightGrams = weightFromSizeText;
  }

  const packMultiplier = getPackMultiplier(name, url);

  if (weightGrams) {
    weightGrams *= packMultiplier;
  }

  return weightGrams;
}

export async function scrapeProductPage(url) {
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

      // variant[1] = stock quantity for this specific variant
      const stock = variant[1];

      if (stock <= 0) {
        continue; // skip out-of-stock variants
      }

      // variant[12] contains text like "Smak: Lemon Lime Storlek: 750 g"
      const variantInfoText = variant[12];

      // variant[16] contains the product description HTML
      const variantHtml = variant[16];
      const $variant = cheerio.load(variantHtml);

      // Extract product name from <h2>
      const name = $variant('h2').text().trim();

      // Extract text from description HTML (used for Nettovikt)
      const variantText = $variant.text();

      const weightGrams = getWeightGrams({
        variantInfoText,
        variantText,
        name,
        url,
      });

      // Extract protein per 100g from nutrition table
      const proteinRow = $variant('td:contains("Protein")').parent();
      const proteinText = proteinRow.find('td').eq(1).text();
      const proteinPer100g = Number(proteinText.replace(/\D/g, ''));

      // Determine how many units are included (e.g. "2 st", "4 st")
      // Used to differentiate product IDs for multipacks
      const packMultiplier = getPackMultiplier(name, url);

      // Build normalized product object for our app
      const product = {
        id: `mmsports-${variantId}-${packMultiplier}pack`,
        url,
        name,
        store: 'MMSports',
        price,
        weightGrams,
        proteinPer100g,
      };

      products.push(product);
    }

    return products;
  } catch (error) {
    console.error('Scrape failed:', error.message);
    return [];
  }
}
