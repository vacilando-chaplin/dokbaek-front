"use client";

interface FilterInputProps {
  min: number;
  max: number;
  step: number;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}

const FilterInput = ({
  min,
  max,
  step,
  unit,
  value,
  onChange
}: FilterInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!/^\d*$/.test(inputValue)) return;

    const trimmedValue = inputValue.replace(/^0+(?=\d)/, "");
    const newValue = trimmedValue === "" ? 0 : Number(trimmedValue);

    onChange(newValue);
  };

  return (
    <div className="typography-body3 interaction-default flex h-10 w-full items-center gap-2 rounded-xl border border-border-default-light px-3 py-[11px] font-regular focus-within:border-border-active-light hover:border-border-active-light dark:border-border-default-dark dark:focus-within:border-border-active-dark dark:hover:border-border-active-dark">
      <input
        type="text"
        inputMode="numeric"
        value={value || 0}
        min={min}
        max={max}
        step={step}
        className="h-auto w-full bg-background-surface-light text-content-primary-light placeholder-content-alternative-light outline-none dark:bg-background-surface-dark dark:text-content-primary-dark dark:placeholder-content-alternative-dark"
        onChange={handleChange}
      />
      {unit && (
        <div className="text-[12px] text-content-secondary-light dark:text-content-secondary-dark">
          {unit}
        </div>
      )}
    </div>
  );
};

export default FilterInput;
