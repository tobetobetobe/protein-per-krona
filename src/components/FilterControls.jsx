function FilterControls({
  showFilters,
  setShowFilters,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  lowestPrice,
  highestPrice,
}) {
  return (
    <div className="filter-controls">
      <button type="button" className="filter-button" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Dölj filter' : 'Filter'}
      </button>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Min pris: {minPrice} kr</label>
            <input
              type="range"
              min={lowestPrice}
              max={highestPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>Max pris: {maxPrice} kr</label>
            <input
              type="range"
              min={lowestPrice}
              max={highestPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterControls;
