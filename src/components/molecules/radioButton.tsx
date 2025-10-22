import { sizeStyleType } from "@/lib/types";
import RadioInput from "../atoms/radioInput";

type RadioSizeStyleType = Pick<sizeStyleType, "large" | "medium">;

interface RadioButtonProps {
  size?: "large" | "medium";
  label: string;
  id: string;
  value: string | null;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: string | null) => void;
}

const RadioButton = ({
  size = "medium",
  label,
  id,
  value,
  name,
  checked,
  disabled,
  onChange
}: RadioButtonProps) => {
  const inputSizeStyle: RadioSizeStyleType = {
    large: "h-[22px] w-[22px] mr-[10px]",
    medium: "h-[18px] w-[18px] mr-[8px]"
  };

  const getBorderClasses = (checked: boolean) =>
    checked
      ? "border-[5px] border-accent-primary-light dark:border-accent-primary-dark"
      : "border-[1.5px] border-border-default-light dark:border-border-default-dark hover:border-accent-primary-light dark:hover:border-accent-primary-dark";

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <RadioInput
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <div
        className={`flex items-center rounded-full ${inputSizeStyle[size]} ${getBorderClasses(checked ?? false)}`}
      />
      <span className="typography-body2 font-regular text-content-primary-light dark:text-content-primary-dark">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
