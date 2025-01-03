import Check from "../../../public/icons/Check.svg";

interface CheckboxProps {
  type: string;
  size: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface checkboxSizeType {
  large: string;
  medium: string;
  small: string;
  [key: string]: string;
}

const Checkbox = ({ type, size, disabled, onChange }: CheckboxProps) => {
  const checkIconSize: checkboxSizeType = {
    large: "22",
    medium: "18",
    small: "16"
  };

  const checkboxSize: checkboxSizeType = {
    large: "w-[22px] h-[22px] rounded-md",
    medium: "w-[18px] h-[18px] rounded-md",
    small: "w-4 h-4 rounded-[5px]"
  };

  return (
    <label className="inline-flex h-fit w-fit cursor-pointer">
      <input
        type="checkbox"
        disabled={disabled}
        className="peer hidden"
        onChange={onChange}
      />
      <span
        className={`relative flex appearance-none items-center justify-center border-[1.5px] border-border-default-light transition-all duration-100 ease-linear hover:border-accent-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary-light peer-checked:border-accent-primary-light peer-checked:bg-accent-primary-light ${checkboxSize[size]} ${disabled && "border-border-disabled-light bg-background-disabled-light"}`}
      >
        <Check
          width="14"
          height="16"
          fill="#FFFFFF"
          className="absolute h-fit w-fit peer-checked:block"
        />
      </span>
    </label>
  );
};

export default Checkbox;
