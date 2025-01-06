import { sizeStyleType } from "@/types/types";

interface TextInputProps {
  type: string;
  size: string;
  name: string;
  value: string | number;
  disabled?: boolean;
  parameter?: string;
  maxLength?: number;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({
  type,
  size,
  name,
  value,
  disabled,
  parameter,
  maxLength,
  placeholder,
  onChange
}: TextInputProps) => {
  const sizeStyle: sizeStyleType = {
    large:
      "h-[49px] text-body2 leading-body2 tracking-body2 gap-2 rounded-[14px] py-3.5 px-4",
    medium:
      "h-10 text-body3 leading-body3 tracking-body3 gap-2 rounded-xl py-[11px] px-3",
    small: "h-7 text-body3 leading-body3 tracking-body3 gap-1 rounded-lg px-2"
  };

  return (
    <div
      className={`flex border border-border-default-light font-regular transition-all duration-100 ease-linear focus-within:border-border-active-light ${disabled ? "bg-background-disabled-light" : "bg-background-surface-light"} ${sizeStyle[size]}`}
    >
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        className="h-auto w-full text-content-primary-light placeholder-content-alternative-light outline-none"
        onChange={onChange}
      />
      {parameter && (
        <div className="text-content-secondary-light">{parameter}</div>
      )}
    </div>
  );
};

export default TextInput;
