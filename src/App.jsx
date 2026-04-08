import "./App.css";
import { products } from "./data/products";
import { useState } from "react";

function App() {
  const [sortBy, setSortBy] = useState("proteinPerKrona");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "proteinPerKrona") {
      const aValue = (a.weightGrams * (a.proteinPer100g / 100)) / a.price;
      const bValue = (b.weightGrams * (b.proteinPer100g / 100)) / b.price;
      return bValue - aValue;
    }
    if (sortBy === "price") {
      return a.price - b.price;
    }

    return 0;
  });

  return (
    <div className="app">
      <div className="container">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="proteinPerKrona">Protein / kr (högt till lågt)</option>
          <option value="price">Pris (lågt til högt)</option>
        </select>
        <h1>Protein per krona</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Store</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Protein/100g</th>
              <th>Total Protein</th>
              <th>Protein per krona</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => {
              const totalProtein =
                (product.weightGrams * product.proteinPer100g) / 100;
              const ProteinPerKrona = totalProtein / product.price;

              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.store}</td>
                  <td>{product.price}kr</td>
                  <td>{product.weightGrams}g</td>
                  <td>{product.proteinPer100g}g</td>
                  <td>{totalProtein}g</td>
                  <td>{ProteinPerKrona.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
