import './App.css';
import SortControls from './components/SortControls';
import FilterControls from './components/FilterControls';
import ProductTable from './components/ProductTable';
import products from '../data/products.json';
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
  //PPKs
  const ppks = products.map((product) => getProteinPerKrona(product));
  const lowestPpk = Math.min(...ppks);
  const highestPpk = Math.max(...ppks);

  const ranges = {
    price: {
      min: lowestPrice,
      max: highestPrice,
    },
    weight: {
      min: lowestWeight,
      max: highestWeight,
    },
    ppk: {
      min: lowestPpk,
      max: highestPpk,
    },
  };

  //State variables
  const [sortBy, setSortBy] = useState('proteinPerKrona');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: {
      min: lowestPrice,
      max: highestPrice,
    },
    weight: {
      min: lowestWeight,
      max: highestWeight,
    },
    ppk: {
      min: lowestPpk,
      max: highestPpk,
    },
  });

  //Filter logic
  const filteredProducts = products.filter((product) => {
    const proteinPerKrona = getProteinPerKrona(product);

    return (
      product.price >= filters.price.min &&
      product.price <= filters.price.max &&
      product.weightGrams >= filters.weight.min &&
      product.weightGrams <= filters.weight.max &&
      proteinPerKrona >= filters.ppk.min &&
      proteinPerKrona <= filters.ppk.max
    );
  });

  //Product sorting
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
            filters={filters}
            setFilters={setFilters}
            ranges={ranges}
          />
        </div>
        <ProductTable products={sortedProducts} />
      </div>
    </div>
  );
}

export default App;
