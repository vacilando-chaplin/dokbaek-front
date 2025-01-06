<<<<<<< HEAD
import { sizeStyleType } from "@/lib/types";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import Option from "../atoms/option";
import HelperText from "../atoms/helperText";
=======
import { sizeStyleType } from "@/types/types";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import Option from "../atoms/option";
<<<<<<< HEAD
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
=======
import HelperText from "../atoms/helperText";
>>>>>>> 80163c6 (textInput 작업 중)

interface SelectDropdownProps {
  size: string;
  name: string;
  list: string[];
  value: string;
  active: boolean;
  selected: string;
  maxLength?: number;
  placeholder?: string;
  helperText?: string;
  onClick: (name: string, item: string) => void;
  onActive: (name: string, state: boolean) => void;
}

const SelectDropdown = ({
  size,
  name,
  list,
  value,
  active,
  selected,
  maxLength,
  placeholder,
  helperText,
  onClick,
  onActive
}: SelectDropdownProps) => {
  const sizeStyle: sizeStyleType = {
    large: "rounded-[14px]",
    medium: "rounded-xl",
    small: ""
  };

  return (
    <div className="relative flex w-full flex-col gap-1 font-normal">
      <div
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        className={`${sizeStyle[size]} interaction-default flex h-10 w-full cursor-pointer flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] focus-within:border-border-active-light hover:border-border-active-light ${active && "focus-within:border-border-active-light"}`}
        onClick={() => onActive(name, active)}
      >
        <input
          className={`typography-body3 w-full cursor-pointer text-content-primary-light outline-none placeholder:text-content-alternative-light`}
=======
        className={`${sizeStyle[size]} flex h-10 w-full cursor-pointer flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] hover:border-border-active-light ${active && "border-border-active-light"}`}
=======
        className={`${sizeStyle[size]} flex h-10 w-full cursor-pointer flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] transition-all duration-100 ease-linear hover:border-border-active-light ${active && "border-border-active-light"}`}
>>>>>>> 80163c6 (textInput 작업 중)
=======
        className={`${sizeStyle[size]} flex h-10 w-full cursor-pointer flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] transition-all duration-100 ease-linear focus-within:border-border-active-light hover:border-border-active-light ${active && "focus-within:border-border-active-light"}`}
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제)
        onClick={() => onActive(name, active)}
      >
        <input
          className={`w-full cursor-pointer text-body3 leading-body3 tracking-body3 text-content-primary-light outline-none placeholder:text-content-alternative-light`}
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
          type="text"
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          value={value}
          readOnly={true}
        />
        <button
          type="button"
<<<<<<< HEAD
          className={`interaction-default ml-auto flex ${active && "rotate-180 transform"}`}
=======
          className={`ml-auto flex transition-all duration-100 ease-linear ${active && "rotate-180 transform"}`}
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
        >
          <ArrowTriangleDown width="16" height="16" fill="#212529" />
        </button>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      {helperText && <HelperText type="info" text={helperText} />}
      {active && (
        <ul
          className={`scrollbar interaction-default absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low ${sizeStyle[size]}`}
=======
      {helperText && (
        <span className="text-caption1 leading-caption1 tracking-caption1 text-content-tertiary-light">
          {helperText}
        </span>
      )}
=======
      {helperText && <HelperText type="info" text={helperText} />}
>>>>>>> 80163c6 (textInput 작업 중)
      {active && (
        <ul
<<<<<<< HEAD
          className={`scrollbar absolute top-10 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto ${sizeStyle[size]} bg-background-elevated-light p-2 shadow-low transition-all duration-100 ease-linear`}
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
=======
          className={`scrollbar absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto ${sizeStyle[size]} bg-background-elevated-light p-2 shadow-low transition-all duration-100 ease-linear`}
>>>>>>> bed1c0d (dropdown spacing 추가)
        >
          {list.map((item: string, index: number) => {
            return (
              <Option
                key={`${item}${index}`}
                name={name}
                item={item}
                size={size}
                active={active}
                selected={selected}
                onClick={onClick}
                onActive={onActive}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
