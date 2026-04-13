import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

function RangeFilter({ label, unit = '', min, max, value, step, decimals, onChange }) {
  const format = (val) => {
    if (decimals !== undefined) {
      return val.toFixed(decimals);
    }
    return val;
  };
  return (
    <div className="filter-group">
      <label>
        {label}: {format(value[0])} - {format(value[1])} {unit}
      </label>
      <Slider range min={min} max={max} value={value} onChange={onChange} step={step} />
    </div>
  );
}

export default RangeFilter;
