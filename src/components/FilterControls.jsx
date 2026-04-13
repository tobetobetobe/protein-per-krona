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
  minPpk,
  setMinPpk,
  maxPpk,
  setMaxPpk,
  highestPpk,
  lowestPpk,
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
            step={1}
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
            step={10}
            onChange={(value) => {
              setMinWeight(value[0]);
              setMaxWeight(value[1]);
            }}
          />
          <RangeFilter
            label="PPK"
            unit="g/kr"
            min={lowestPpk}
            max={highestPpk}
            value={[minPpk, maxPpk]}
            step={0.01}
            decimals={2}
            onChange={(value) => {
              setMinPpk(value[0]);
              setMaxPpk(value[1]);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FilterControls;
