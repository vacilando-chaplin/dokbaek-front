import { sizeStyleType } from "@/lib/types";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import Option from "../atoms/option";
import HelperText from "../atoms/helperText";

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
        className={`${sizeStyle[size]} interaction-default flex h-10 w-full cursor-pointer flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] focus-within:border-border-active-light hover:border-border-active-light dark:border-border-default-dark dark:bg-background-surface-dark dark:focus-within:border-border-active-dark dark:hover:border-border-active-dark`}
        onClick={() => onActive(name, active)}
      >
        <input
          className={`typography-body3 w-full cursor-pointer bg-background-surface-light text-content-primary-light outline-none placeholder:text-content-alternative-light dark:bg-background-surface-dark dark:text-content-primary-dark dark:placeholder:text-content-alternative-dark`}
          type="text"
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          value={value}
          readOnly={true}
        />
        <button
          type="button"
          className={`interaction-default ml-auto flex ${active && "rotate-180 transform"}`}
        >
          <ArrowTriangleDown width="16" height="16" fill="#212529" />
        </button>
      </div>
      {helperText && <HelperText type="info" text={helperText} />}
      {active && (
        <ul
          className={`scrollbar interaction-default absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low dark:bg-background-elevated-dark ${sizeStyle[size]}`}
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
