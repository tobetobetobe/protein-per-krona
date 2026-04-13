import RangeFilter from './RangeFilter';

function FilterControls({ showFilters, setShowFilters, filters, setFilters, ranges }) {
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
            min={ranges.price.min}
            max={ranges.price.max}
            value={[filters.price.min, filters.price.max]}
            step={1}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                price: {
                  min: value[0],
                  max: value[1],
                },
              }))
            }
          />
          <RangeFilter
            label="Vikt"
            unit="g"
            min={ranges.weight.min}
            max={ranges.weight.max}
            value={[filters.weight.min, filters.weight.max]}
            step={10}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                weight: {
                  min: value[0],
                  max: value[1],
                },
              }))
            }
          />
          <RangeFilter
            label="PPK"
            unit="g/kr"
            min={ranges.ppk.min}
            max={ranges.ppk.max}
            value={[filters.ppk.min, filters.ppk.max]}
            step={0.01}
            decimals={2}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                ppk: {
                  min: value[0],
                  max: value[1],
                },
              }))
            }
          />
        </div>
      )}
    </div>
  );
}

export default FilterControls;
