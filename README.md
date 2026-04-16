# Protein per krona

A React app for comparing protein powders based on price, weight and protein content, powered by a custom scraping pipeline for real product data.

## Features

- Sort by price or protein per krona (PPK)
- Filter by price, weight and PPK
- Interactive range sliders
- Real product data from MMSports

## Data pipeline

The project includes a custom scraping pipeline for collecting and normalizing product data:

- Scrapes all protein products from MMSports
- Extracts:
  - price
  - weight (handles multiple edge cases)
  - protein per 100g
  - stock status (filters out unavailable products)
- Supports multipack products (e.g. "2 st", "4 st")
- Outputs structured JSON used by the frontend

## Tech

- React
- Vite
- JavaScript
- Node.js (for scraping scripts)
- Cheerio (HTML parsing)

## Getting started

Install dependencies:

npm install

Run the frontend:

npm run dev

Run the scraper:

node scripts/mmsports/scrapeStore.js

## Project structure

- data/
  - mmsports-products.json
  - mock-products.json

- scripts/
  - mmsports/
    - scrapeCategoryPage.js
    - scrapeProductPage.js
    - scrapeStore.js

- src/
  - components/
    - FilterControls.jsx
    - ProductTable.jsx
    - RangeFilter.jsx
    - SortControls.jsx
  - utils/
    - calculations.js
  - App.jsx
  - App.css
  - main.jsx
  - index.css

- public/
- index.html
- package.json
- vite.config.js

## Future improvements

- Add more stores
- Deduplicate products across categories
- Add search functionality in frontend
- Improve filtering (e.g. by protein type)
- Move scraping to backend/API
