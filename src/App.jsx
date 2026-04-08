import "./App.css";
import ProductTable from "./components/ProductTable";
import SortControls from "./components/SortControls";
import { products } from "./data/products";
import { getProteinPerKrona } from "./utils/calculations";
import { useState } from "react";

function App() {
  const [sortBy, setSortBy] = useState("proteinPerKrona");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "proteinPerKrona") {
      return getProteinPerKrona(b) - getProteinPerKrona(a);
    }
    if (sortBy === "price") {
      return a.price - b.price;
    }

    return 0;
  });

  return (
    <div className="app">
      <div className="container">
        <h1>Protein per krona</h1>
        <SortControls sortBy={sortBy} setSortBy={setSortBy} />
        <ProductTable products={sortedProducts} />
      </div>
    </div>
  );
}

export default App;
