import { getTotalProtein, getProteinPerKrona } from "../utils/calculations";

function ProductTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Butik</th>
          <th>Pris</th>
          <th>Vikt</th>
          <th>Protein/100 g</th>
          <th>Totalt Protein</th>
          <th>PPK</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const totalProtein = getTotalProtein(product);
          const proteinPerKrona = getProteinPerKrona(product);

          return (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.store}</td>
              <td>{product.price} kr</td>
              <td>{product.weightGrams} g</td>
              <td>{product.proteinPer100g} g</td>
              <td>{totalProtein} g</td>
              <td>{proteinPerKrona.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
