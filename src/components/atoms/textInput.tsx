<<<<<<< HEAD
import { sizeStyleType } from "@/lib/types";
import Youtube from "../../../public/icons/YouTube.svg";
import Instagram from "../../../public/icons/Instagram.svg";
=======
import { sizeStyleType } from "@/types/types";
<<<<<<< HEAD
>>>>>>> 80163c6 (textInput 작업 중)
=======
import Youtube from "../../../public/icons/YouTube.svg";
import Instagram from "../../../public/icons/Instagram.svg";
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제)

interface TextInputProps {
  type: string;
  size: string;
  name: string;
<<<<<<< HEAD
<<<<<<< HEAD
  value: string;
  icon?: string;
  limit?: boolean;
=======
  value: string | number;
>>>>>>> 80163c6 (textInput 작업 중)
=======
  value: string;
  icon?: string;
  limit?: boolean;
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제)
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
<<<<<<< HEAD
<<<<<<< HEAD
  icon,
  limit,
=======
>>>>>>> 80163c6 (textInput 작업 중)
=======
  icon,
  limit,
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제)
  disabled,
  parameter,
  maxLength,
  placeholder,
  onChange
}: TextInputProps) => {
  const sizeStyle: sizeStyleType = {
<<<<<<< HEAD
    large: "h-[49px] typography-body2 gap-2 rounded-[14px] py-3.5 px-4",
    medium: "h-10 typography-body3 gap-2 rounded-xl py-[11px] px-3",
    small: "h-7 typography-body3 gap-1 rounded-lg px-2"
=======
    large:
      "h-[49px] text-body2 leading-body2 tracking-body2 gap-2 rounded-[14px] py-3.5 px-4",
    medium:
      "h-10 text-body3 leading-body3 tracking-body3 gap-2 rounded-xl py-[11px] px-3",
    small: "h-7 text-body3 leading-body3 tracking-body3 gap-1 rounded-lg px-2"
>>>>>>> 80163c6 (textInput 작업 중)
  };

  return (
    <div
<<<<<<< HEAD
<<<<<<< HEAD
      className={`interaction-default flex w-full border border-border-default-light font-regular focus-within:border-border-active-light hover:border-border-active-light ${disabled ? "bg-background-disabled-light" : "bg-background-surface-light"} ${sizeStyle[size]}`}
    >
      {icon === "youtube" && <Youtube width="16" height="16" fill="#ADB5BD" />}
      {icon === "instagram" && (
        <Instagram width="16" height="16" fill="#ADB5BD" />
      )}
=======
      className={`flex border border-border-default-light font-regular transition-all duration-100 ease-linear focus-within:border-border-active-light ${disabled ? "bg-background-disabled-light" : "bg-background-surface-light"} ${sizeStyle[size]}`}
    >
>>>>>>> 80163c6 (textInput 작업 중)
=======
      className={`flex w-full border border-border-default-light font-regular transition-all duration-100 ease-linear focus-within:border-border-active-light hover:border-border-active-light ${disabled ? "bg-background-disabled-light" : "bg-background-surface-light"} ${sizeStyle[size]}`}
    >
      {icon === "youtube" && <Youtube width="16" height="16" fill="#ADB5BD" />}
      {icon === "instagram" && (
        <Instagram width="16" height="16" fill="#ADB5BD" />
      )}
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제)
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
<<<<<<< HEAD
<<<<<<< HEAD
      {limit && (
        <label className="text-caption1 text-[#787887]">
          {value.length}/{maxLength}
        </label>
      )}
=======
>>>>>>> 80163c6 (textInput 작업 중)
=======
      {limit && (
        <label className="text-[12px] text-[#787887]">
          {value.length}/{maxLength}
        </label>
      )}
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제)
    </div>
  );
};

export default TextInput;
