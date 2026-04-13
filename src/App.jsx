import './App.css';
import SortControls from './components/SortControls';
import FilterControls from './components/FilterControls';
import ProductTable from './components/ProductTable';
import { products } from './data/products';
import { getProteinPerKrona } from './utils/calculations';
import { useState } from 'react';

function App() {
  //Starting values for price filter sliders
  const prices = products.map((product) => product.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  //State variables
  const [sortBy, setSortBy] = useState('proteinPerKrona');
  const [minPrice, setMinPrice] = useState(lowestPrice);
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'proteinPerKrona') {
      return getProteinPerKrona(b) - getProteinPerKrona(a);
    }
    if (sortBy === 'price') {
      return a.price - b.price;
    }

    return 0;
  });

  return (
    <div className="app">
      <div className="container">
        <h1>Protein per krona</h1>
        <div className="controls-bar">
          <SortControls sortBy={sortBy} setSortBy={setSortBy} />
          <FilterControls
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            lowestPrice={lowestPrice}
            highestPrice={highestPrice}
          />
        </div>
        <ProductTable products={sortedProducts} />
      </div>
    </div>
  );
}

export default App;
