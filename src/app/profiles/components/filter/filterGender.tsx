"use client";

import RadioGroup from "@/components/organisms/radioGroup";
import FilterBox from "./filterBox";
import FilterHeader from "./filterHeader";
import { useActive } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import CollapseMotion from "@/components/atoms/collapseMotion";

interface FilterGenderProps {
  gender: string | null;
  onReset: () => void;
  onChange: (gender: string | null) => void;
}

const FilterGender = ({ gender, onReset, onChange }: FilterGenderProps) => {
  const { active, onActive } = useActive();

  const genderOptions = [
    { label: "전체", value: null },
    { label: "여성", value: "F" },
    { label: "남성", value: "M" }
  ];

  return (
    <FilterBox>
      <FilterHeader
        name="gender"
        title="성별"
        value={gender}
        isActive={active}
        onReset={onReset}
        onActive={onActive}
      />
      <AnimatePresence initial={false}>
        {active && (
          <CollapseMotion>
            <RadioGroup
              name="성별"
              size="medium"
              options={genderOptions}
              value={gender || null}
              onChange={onChange}
            />
          </CollapseMotion>
        )}
      </AnimatePresence>
    </FilterBox>
  );
};

export default FilterGender;
