"use client";

import { useActive } from "@/lib/hooks";
import FilterBox from "./filterBox";
import FilterHeader from "./filterHeader";
import FilterInput from "./filterInput";
import { motion, AnimatePresence } from "framer-motion";

interface FilterRangeInputProps {
  min: number;
  max: number;
  step: number;
  name: "age" | "height" | "weight";
  title: "나이" | "키" | "몸무게";
  unit: "세" | "cm" | "kg";
  range: [number, number];
  minValue: number;
  maxValue: number;
  onReset: () => void;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onRangeChange: (newRange: [number, number]) => void;
}

const FilterRangeInput = ({
  min,
  max,
  step,
  name,
  title,
  unit,
  range,
  minValue,
  maxValue,
  onReset,
  onMinChange,
  onMaxChange,
  onRangeChange
}: FilterRangeInputProps) => {
  const { active, onActive } = useActive();

  return (
    <FilterBox>
      <FilterHeader
        name={name}
        title={title}
        range={`${minValue}~${maxValue}${unit}`}
        isActive={active}
        isChangedValue={minValue !== min || maxValue !== max}
        onReset={onReset}
        onActive={onActive}
      />
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full flex-row items-center gap-2">
                <FilterInput
                  min={min}
                  max={max - step}
                  value={minValue}
                  unit={unit}
                  step={step}
                  onChange={onMinChange}
                />
                <span className="typography-body3 font-regular text-content-primary-light dark:text-content-primary-dark">
                  ~
                </span>
                <FilterInput
                  min={min + step}
                  max={max}
                  value={maxValue}
                  unit={unit}
                  step={step}
                  onChange={onMaxChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FilterBox>
  );
};

export default FilterRangeInput;
