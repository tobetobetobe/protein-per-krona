import './App.css';
import SortControls from './components/SortControls';
import FilterControls from './components/FilterControls';
import ProductTable from './components/ProductTable';
import { products } from './data/products';
import { getProteinPerKrona } from './utils/calculations';
import { useState } from 'react';

function App() {
  //Starting values for filter sliders
  //Prices
  const prices = products.map((product) => product.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  //Weights
  const weights = products.map((product) => product.weightGrams);
  const lowestWeight = Math.min(...weights);
  const highestWeight = Math.max(...weights);

  //State variables
  const [sortBy, setSortBy] = useState('proteinPerKrona');
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(lowestPrice);
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [minWeight, setMinWeight] = useState(lowestWeight);
  const [maxWeight, setMaxWeight] = useState(highestWeight);

  const filteredProducts = products.filter((product) => {
    return (
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.weightGrams >= minWeight &&
      product.weightGrams <= maxWeight
    );
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
            minWeight={minWeight}
            setMinWeight={setMinWeight}
            maxWeight={maxWeight}
            setMaxWeight={setMaxWeight}
            highestWeight={highestWeight}
            lowestWeight={lowestWeight}
          />
        </div>
        <ProductTable products={sortedProducts} />
      </div>
    </div>
  );
}

export default App;
