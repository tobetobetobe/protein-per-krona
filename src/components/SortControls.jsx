function SortControls ({sortBy, setSortBy}) {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="proteinPerKrona">PPK (högt till lågt)</option>
      <option value="price">Pris (lågt till högt)</option>
    </select>
  )
}

export default SortControls