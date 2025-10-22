import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "../../styles/rangeSlider.css";
interface RangeSliderProps {
  value: [number, number];
  setValue: (value: [number, number]) => void;
  min: number;
  max: number;
}

const RangeSliderComponent = ({
  value,
  setValue,
  min,
  max
}: RangeSliderProps) => {
  return (
    <div>
      <RangeSlider
        id="range-slider-custom"
        value={value}
        onInput={setValue}
        min={min}
        max={max}
      />
    </div>
  );
};

export default RangeSliderComponent;
