import { sizeStyleType } from "@/types/types";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import Option from "../atoms/option";
import HelperText from "../atoms/helperText";

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
        className={`${sizeStyle[size]} flex h-10 w-full flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] transition-all duration-100 ease-linear hover:border-border-active-light ${active && "border-border-active-light"}`}
      >
        <input
          className={`w-full text-body3 leading-body3 tracking-body3 text-content-primary-light outline-none placeholder:text-content-alternative-light`}
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
          className={`ml-auto flex transition-all duration-100 ease-linear ${active && "rotate-180 transform"}`}
          onClick={() => onActive(name, active)}
        >
          <ArrowTriangleDown width="16" height="16" fill="#212529" />
        </button>
      </div>
      {helperText && <HelperText type="info" text={helperText} />}
      {active &&
        (isEmpty ? (
          <div className="absolute top-11 z-40 w-full overflow-auto rounded-xl bg-background-elevated-light p-3 text-body3 font-normal leading-body3 tracking-body3 text-gray-300 shadow-low transition-all duration-100 ease-linear">
            <label>일치하는 항목이 없습니다.</label>
          </div>
        ) : (
          <ul
            className={`scrollbar absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low transition-all duration-100 ease-linear ${sizeStyle[size]}`}
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
