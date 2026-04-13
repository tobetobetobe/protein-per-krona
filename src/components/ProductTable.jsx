import { getTotalProtein, getProteinPerKrona } from '../utils/calculations';

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
          const { id, name, store, price, weightGrams, proteinPer100g } = product;
          const totalProtein = getTotalProtein(product);
          const proteinPerKrona = getProteinPerKrona(product);

          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{store}</td>
              <td>{price} kr</td>
              <td>{weightGrams} g</td>
              <td>{proteinPer100g} g</td>
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
