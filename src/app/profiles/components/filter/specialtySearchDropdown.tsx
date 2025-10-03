import { sizeStyleType } from "@/lib/types";
import ArrowTriangleDown from "../../../../../public/icons/ArrowTriangleDown.svg";
import HelperText from "@/components/atoms/helperText";
import { SpecialtyType } from "@/components/molecules/addableSearchDropdown";
import SpecialtySearchDropdownOption from "./specialtysearchDropdownOption";

interface SpecialtySearchDropdownProps {
  size: string;
  name: string;
  list: SpecialtyType[];
  value: string | number | null;
  active: boolean;
  selected: string | number;
  isEmpty?: boolean;
  maxLength?: number;
  helperText?: string;
  placeholder?: string;
  onClick: (specialty: SpecialtyType) => void;
  onActive: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SpecialtySearchDropdown = ({
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
}: SpecialtySearchDropdownProps) => {
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
          value={value ? value : ""}
          onChange={onChange}
        />
        <button
          type="button"
          className={`interaction-default ml-auto flex ${active && "rotate-180 transform"}`}
          onClick={onActive}
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
            <label>검색하신 특기가 존재하지 않습니다.</label>
          </div>
        ) : (
          <ul
            className={`scrollbar dark:dark-scrollbar-dropdown interaction-default absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low dark:bg-background-elevated-dark ${sizeStyle[size]}`}
          >
            {list.map((item: SpecialtyType) => {
              return (
                <SpecialtySearchDropdownOption
                  key={item.id}
                  item={item}
                  size={size}
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

export default SpecialtySearchDropdown;
