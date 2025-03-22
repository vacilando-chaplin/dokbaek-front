import { sizeStyleType } from "@/lib/types";
import Check from "../../../public/icons/Check.svg";

interface CheckboxProps {
  type: string;
  size: string;
  checked: boolean | undefined;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  type,
  size,
  checked,
  disabled,
  onChange
}: CheckboxProps) => {
  const checkIconSize: sizeStyleType = {
    large: "22",
    medium: "18",
    small: "16"
  };

  const checkboxSize: sizeStyleType = {
    large: "w-[22px] h-[22px] rounded-md",
    medium: "w-[18px] h-[18px] rounded-md",
    small: "w-4 h-4 rounded-[5px]"
  };

  return (
    <label
      className={`inline-flex h-fit w-fit ${!disabled && "cursor-pointer"}`}
    >
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        className="peer hidden"
        onChange={onChange}
      />
      <span
        className={`interaction-default relative flex appearance-none items-center justify-center border-[1.5px] border-border-default-light focus:outline-none focus:ring-2 focus:ring-accent-primary-light peer-checked:border-accent-primary-light peer-checked:bg-accent-primary-light dark:border-border-default-dark dark:focus:ring-accent-primary-dark dark:peer-checked:border-accent-primary-dark dark:peer-checked:bg-accent-primary-dark ${checkboxSize[size]} ${disabled ? "border-border-disabled-light bg-background-disabled-light dark:border-border-disabled-dark dark:bg-background-disabled-dark" : "hover:border-accent-primary-light dark:hover:border-accent-primary-dark"}`}
      >
        <Check
          width="14"
          height="16"
          className={`fill-current absolute h-fit w-fit text-content-on_color-light dark:text-content-on_color-dark ${checked ? "block" : "hidden"}`}
        />
      </span>
    </label>
  );
};

export default Checkbox;
