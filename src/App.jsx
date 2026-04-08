import './App.css'
import { products } from './data/products'

function App() {
  return (
    <div>
      <h1>Protein per krona</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Store</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Protein/100g</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>(
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.store}</td>
              <td>{product.price} kr</td>
              <td>{product.weightGrams} g</td>
              <td>{product.proteinPer100g} g</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
