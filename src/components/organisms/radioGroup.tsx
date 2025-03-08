import { useState } from "react";
import RadioButton from "../molecules/radioButton";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup = ({
  name,
  options,
  value,
  onChange = () => {}
}: RadioGroupProps) => {
  return (
    <div className="flex gap-6">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          id={`${name}-${option.value}`}
          name={name}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
