import RangeFilter from './RangeFilter';

function FilterControls({
  showFilters,
  setShowFilters,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  lowestPrice,
  highestPrice,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  highestWeight,
  lowestWeight,
}) {
  return (
    <div className="filter-controls">
      <button type="button" className="filter-button" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Dölj filter' : 'Filter'}
      </button>

      {showFilters && (
        <div className="filter-panel">
          <RangeFilter
            label="Pris"
            unit="kr"
            min={lowestPrice}
            max={highestPrice}
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
            }}
          />
          <RangeFilter
            label="Vikt"
            unit="g"
            min={lowestWeight}
            max={highestWeight}
            value={[minWeight, maxWeight]}
            onChange={(value) => {
              setMinWeight(value[0]);
              setMaxWeight(value[1]);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FilterControls;
