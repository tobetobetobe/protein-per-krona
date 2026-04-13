import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

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
            <label>
              Pris: {minPrice} - {maxPrice} kr
            </label>
            <Slider
              range
              min={lowestPrice}
              max={highestPrice}
              value={[minPrice, maxPrice]}
              onChange={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterControls;
