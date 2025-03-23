import { sizeStyleType } from "@/lib/types";
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
  onSave?: () => void;
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
  onChange,
  onSave
}: SearchDropdownProps) => {
  const sizeStyle: sizeStyleType = {
    large: "rounded-[14px]",
    medium: "rounded-xl",
    small: ""
  };

  return (
    <div className="relative flex w-full flex-col gap-1 font-normal">
      <div
        className={`${sizeStyle[size]} interaction-default flex h-10 w-full flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] focus-within:border-border-active-light hover:border-border-active-light dark:border-border-default-dark dark:bg-background-surface-dark dark:focus-within:border-border-active-dark dark:hover:border-border-active-dark`}
      >
        <input
          className={`typography-body3 w-full bg-background-surface-light text-content-primary-light outline-none placeholder:text-content-alternative-light dark:bg-background-surface-dark dark:text-content-primary-dark dark:placeholder:text-content-alternative-dark`}
          type="text"
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          value={value}
          onChange={onChange}
          onBlur={onSave}
        />
        <button
          type="button"
          className={`interaction-default ml-auto flex ${active && "rotate-180 transform"}`}
          onClick={() => onActive(name, active)}
        >
          <ArrowTriangleDown
            width="16"
            height="16"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
        </button>
      </div>
      {helperText && <HelperText type="info" text={helperText} />}
      {active &&
        (isEmpty ? (
          <div className="interaction-default typography-body3 absolute top-11 z-40 w-full overflow-auto rounded-xl bg-background-elevated-light p-3 font-normal text-gray-300 shadow-low dark:bg-background-elevated-dark">
            <label>일치하는 항목이 없습니다.</label>
          </div>
        ) : (
          <ul
            className={`scrollbar dark:dark-scrollbar-dropdown interaction-default absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low dark:bg-background-elevated-dark ${sizeStyle[size]}`}
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
