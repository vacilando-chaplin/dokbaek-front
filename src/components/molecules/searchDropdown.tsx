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

interface SearchDropdownProps {
  size: string;
  name: string;
  list: string[];
  value: string;
  active: boolean;
  selected: string;
  isEmpty?: boolean;
  maxLength?: number;
  helperText?: string;
  placeholder?: string;
  onClick: (name: string, item: string) => void;
  onActive: (name: string, state: boolean) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchDropdown = ({
  size,
  name,
  list,
  value,
  active,
  selected,
  isEmpty,
  maxLength,
  helperText,
  placeholder,
  onClick,
  onActive,
  onChange
}: SearchDropdownProps) => {
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
        className={`${sizeStyle[size]} interaction-default flex h-10 w-full flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] focus-within:border-border-active-light hover:border-border-active-light`}
      >
        <input
          className={`typography-body3 w-full text-content-primary-light outline-none placeholder:text-content-alternative-light`}
=======
        className={`${sizeStyle[size]} flex h-10 w-full flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] hover:border-border-active-light ${active && "border-border-active-light"}`}
=======
        className={`${sizeStyle[size]} flex h-10 w-full flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] transition-all duration-100 ease-linear hover:border-border-active-light ${active && "border-border-active-light"}`}
>>>>>>> 80163c6 (textInput 작업 중)
      >
        <input
          className={`w-full text-body3 leading-body3 tracking-body3 text-content-primary-light outline-none placeholder:text-content-alternative-light`}
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
          type="text"
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
<<<<<<< HEAD
          className={`interaction-default ml-auto flex ${active && "rotate-180 transform"}`}
=======
          className={`ml-auto flex transition-all duration-100 ease-linear ${active && "rotate-180 transform"}`}
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
          onClick={() => onActive(name, active)}
        >
          <ArrowTriangleDown width="16" height="16" fill="#212529" />
        </button>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      {helperText && <HelperText type="info" text={helperText} />}
      {active &&
        (isEmpty ? (
          <div className="interaction-default typography-body3 absolute top-11 z-40 w-full overflow-auto rounded-xl bg-background-elevated-light p-3 font-normal text-gray-300 shadow-low">
=======
      {helperText && (
        <span className="text-caption1 leading-caption1 tracking-caption1 text-content-tertiary-light">
          {helperText}
        </span>
      )}
=======
      {helperText && <HelperText type="info" text={helperText} />}
>>>>>>> 80163c6 (textInput 작업 중)
      {active &&
        (isEmpty ? (
          <div className="absolute top-11 z-40 w-full overflow-auto rounded-xl bg-background-elevated-light p-3 text-body3 font-normal leading-body3 tracking-body3 text-gray-300 shadow-low transition-all duration-100 ease-linear">
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
            <label>일치하는 항목이 없습니다.</label>
          </div>
        ) : (
          <ul
<<<<<<< HEAD
<<<<<<< HEAD
            className={`scrollbar interaction-default absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low ${sizeStyle[size]}`}
=======
            className={`scrollbar absolute top-10 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low transition-all duration-100 ease-linear ${sizeStyle[size]}`}
>>>>>>> a9fcb13 (dropdown => selectDropdown, searchDropdown으로 분류, globals.css에 scrollbar 추가)
=======
            className={`scrollbar absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low transition-all duration-100 ease-linear ${sizeStyle[size]}`}
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
        ))}
    </div>
  );
};

export default SearchDropdown;
