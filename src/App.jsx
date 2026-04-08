import "./App.css";
import SortControls from './components/SortControls';
import { products } from "./data/products";
import { getTotalProtein, getProteinPerKrona } from "./utils/calculations";
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
        <SortControls sortBy={sortBy} setSortBy={setSortBy} />
        <h1>Protein per krona</h1>
        <table>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Säljare</th>
              <th>Pris</th>
              <th>Vikt</th>
              <th>Protein/100g</th>
              <th>Total Protein</th>
              <th>PPK</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.store}</td>
                <td>{product.price}kr</td>
                <td>{product.weightGrams}g</td>
                <td>{product.proteinPer100g}g</td>
                <td>{getTotalProtein(product)}g</td>
                <td>{getProteinPerKrona(product).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
