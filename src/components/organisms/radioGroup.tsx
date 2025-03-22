import RadioButton from "../molecules/radioButton";
interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  size?: "large" | "medium";
  direction?: "horizontal" | "vertical";
  name: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup = ({
  size = "medium",
  direction = "horizontal",
  name,
  options,
  value,
  onChange = () => {}
}: RadioGroupProps) => {
  return (
    <div
      className={`flex ${direction === "horizontal" ? "gap-6" : "flex-col gap-4"}`}
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          id={`${name}-${option.value}`}
          size={size}
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
