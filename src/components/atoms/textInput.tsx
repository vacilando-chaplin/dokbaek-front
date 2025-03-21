import { sizeStyleType } from "@/lib/types";
import Youtube from "../../../public/icons/YouTube.svg";
import Instagram from "../../../public/icons/Instagram.svg";
import Search from "../../../public/icons/Search.svg";

interface TextInputProps {
  type: string;
  size: string;
  name: string;
  value: any;
  icon?: string;
  limit?: boolean;
  disabled?: boolean;
  parameter?: string;
  maxLength?: number;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
}

const TextInput = ({
  type,
  size,
  name,
  value,
  icon,
  limit,
  disabled,
  parameter,
  maxLength,
  placeholder,
  onChange,
  onBlur
}: TextInputProps) => {
  const sizeStyle: sizeStyleType = {
    large: "h-[49px] typography-body2 gap-2 rounded-[14px] py-3.5 px-4",
    medium: "h-10 typography-body3 gap-2 rounded-xl py-[11px] px-3",
    small: "h-7 typography-body3 gap-1 rounded-lg px-2"
  };

  return (
    <div
      className={`interaction-default flex w-full border border-border-default-light font-regular focus-within:border-border-active-light hover:border-border-active-light dark:border-border-default-dark dark:focus-within:border-border-active-dark dark:hover:border-border-active-dark ${disabled ? "bg-background-disabled-light dark:bg-background-disabled-dark" : "bg-background-surface-light dark:bg-background-surface-dark"} ${sizeStyle[size]}`}
    >
      {icon === "search" && <Search width="16" height="16" fill="#ADB5BD" />}
      {icon === "youtube" && <Youtube width="16" height="16" fill="#ADB5BD" />}
      {icon === "instagram" && (
        <Instagram width="16" height="16" fill="#ADB5BD" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        className="h-auto w-full bg-background-surface-light text-content-primary-light placeholder-content-alternative-light outline-none dark:bg-background-surface-dark dark:text-content-primary-dark dark:placeholder-content-alternative-dark"
        onChange={onChange}
        onBlur={onBlur}
      />
      {parameter && (
        <div className="text-content-secondary-light dark:text-content-secondary-dark">
          {parameter}
        </div>
      )}
      {limit && (
        <label className="text-caption1 text-[#787887]">
          {value.length}/{maxLength}
        </label>
      )}
    </div>
  );
};

export default TextInput;
