"use client";

import { useEffect, useRef, useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
}

interface Tick {
  position: number;
  value: number;
  label: string | number;
}

type ThumbType = "min" | "max" | null;

const RangeSlider = ({ min, max, value, onChange }: RangeSliderProps) => {
  const [minValue, setMinValue] = useState(value?.[0] ?? min);
  const [maxValue, setMaxValue] = useState(value?.[1] ?? max);
  const [activeThumb, setActiveThumb] = useState<ThumbType>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
    }
  }, [value]);

  const ticks: Tick[] = [
    { position: 0, value: min, label: 0 },
    {
      position: 25,
      value: min + (max - min) * 0.25,
      label: Math.round(min + (max - min) * 0.25)
    },
    {
      position: 50,
      value: min + (max - min) * 0.5,
      label: Math.round(min + (max - min) * 0.5)
    },
    {
      position: 75,
      value: min + (max - min) * 0.75,
      label: Math.round(min + (max - min) * 0.75)
    },
    { position: 100, value: max, label: "최대" }
  ];

  const valueToPercent = (value: number): number =>
    ((value - min) / (max - min)) * 100;

  const percentToValue = (percent: number): number =>
    Math.round(min + (max - min) * (percent / 100));

  const handleMouseDown =
    (thumb: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setActiveThumb(thumb);
    };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!activeThumb || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const percent = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const value = percentToValue(percent);

    updateValues(activeThumb, value);
  };

  const updateValues = (thumb: "min" | "max", value: number) => {
    if (thumb === "min") {
      const newMin = Math.min(value, maxValue - 1);
      setMinValue(newMin);
      onChange?.([newMin, maxValue]);
    } else {
      const newMax = Math.max(value, minValue + 1);
      setMaxValue(newMax);
      onChange?.([minValue, newMax]);
    }
  };

  const handleTickClick = (tickValue: number) => {
    const distToMin = Math.abs(tickValue - minValue);
    const distToMax = Math.abs(tickValue - maxValue);

    if (distToMin < distToMax) {
      const newMin = Math.min(tickValue, maxValue - 1);
      setMinValue(newMin);
      onChange?.([newMin, maxValue]);
    } else {
      const newMax = Math.max(tickValue, minValue + 1);
      setMaxValue(newMax);
      onChange?.([minValue, newMax]);
    }
  };

  const handleEnd = () => {
    setActiveThumb(null);
  };

  useEffect(() => {
    if (activeThumb) {
      const handleMouseMove = (e: MouseEvent) => handleMove(e);
      const handleMouseUp = () => handleEnd();
      const handleTouchMove = (e: TouchEvent) => handleMove(e);
      const handleTouchEnd = () => handleEnd();

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [activeThumb, minValue, maxValue]);

  const minPercent = valueToPercent(minValue);
  const maxPercent = valueToPercent(maxValue);

  return (
    <div className="w-full px-2.5 pb-5">
      <div className="relative" ref={sliderRef}>
        {/* SliderTrack */}
        <div className="relative h-0.5 w-full rounded-full bg-content-alternative-light dark:bg-content-alternative-dark">
          {/* SliderRange */}
          <div
            className="absolute h-full rounded-full bg-content-primary-light transition-all duration-150 dark:bg-content-primary-dark"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />
          {/* Min Thumb */}
          <div
            className="absolute top-1/2 z-[5] h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full border border-gray-300 bg-static-white shadow-md transition-all duration-100 hover:scale-110"
            style={{
              left: `${minPercent}%`,
              transform: "translate(-50%, -50%)"
            }}
            onMouseDown={handleMouseDown("min")}
            onTouchStart={handleMouseDown("min")}
          />
          {/* Max Thumb */}
          <div
            className="absolute top-1/2 z-[5] h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full border border-gray-300 bg-static-white shadow-md transition-all duration-100 hover:scale-110"
            style={{
              left: `${maxPercent}%`,
              transform: "translate(-50%, -50%)"
            }}
            onMouseDown={handleMouseDown("max")}
            onTouchStart={handleMouseDown("max")}
          />
        </div>
        {/* SliderTicks */}
        {ticks.map((tick, index) => {
          const isActive = tick.value >= minValue && tick.value <= maxValue;
          return (
            <div
              key={index}
              className="group absolute flex cursor-pointer flex-col items-center"
              style={{
                left: `${tick.position}%`,
                transform: "translateX(-50%)",
                top: "50%"
              }}
              onClick={() => handleTickClick(tick.value)}
            >
              <div
                className={`h-1.5 w-0.5 ${isActive ? "bg-content-primary-light dark:bg-content-primary-dark" : "bg-content-alternative-light dark:bg-content-alternative-dark"} transition-colors duration-100 group-hover:bg-content-primary-light group-hover:dark:bg-content-primary-dark`}
                style={{ transform: "translateY(-50%)" }}
              />
              <span
                className={`typography-caption1 mt-0.5 break-keep font-medium ${isActive ? "text-content-primary-light dark:text-content-primary-dark" : "text-content-alternative-light dark:text-content-alternative-dark"} transition-colors duration-150 group-hover:text-content-primary-light group-hover:dark:text-content-primary-dark`}
              >
                {tick.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RangeSlider;
