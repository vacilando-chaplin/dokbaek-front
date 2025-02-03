import React, { useEffect, useState } from "react";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import Option from "../atoms/option";
import { sizeStyleType } from "@/lib/types";
import Plus from "../../../public/icons/Plus.svg"

export interface SpecialtyType {
  id: number;
  specialtyName: string;
}

type AddableSearchDropdownProps = {
  size?: "large" | "medium" | "small";
  name: string;
  list: SpecialtyType[];
  value: string;
  selected: string;
  placeholder: string;
  onClick: (name: string, item: string) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onAdd: (item: string) => void;
};

const AddableSearchDropdown = ({
  size = "medium",
  name,
  list,
  value,
  selected,
  placeholder,
  onClick,
  onChange,
  onAdd
}: AddableSearchDropdownProps) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const sizeStyle: sizeStyleType = {
    large: "rounded-[14px]",
    medium: "rounded-xl",
    small: ""
  };

  useEffect(() => {
    if(value.length > 0) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [value]);


  return (
    <div className="relative flex w-full flex-col gap-1 font-normal">
      <div
        className={`${sizeStyle[size]} interaction-default flex h-10 w-full flex-row gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] focus-within:border-border-active-light hover:border-border-active-light`}
      >
        <input
          className={`typography-body3 w-full text-content-primary-light outline-none placeholder:text-content-alternative-light`}
          type="text"
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className={`interaction-default ml-auto flex ${active && "rotate-180 transform"}`}
          onClick={() => setActive(!active)}
        >
          <ArrowTriangleDown width="16" height="16" fill="#212529" />
        </button>
      </div>
      {active &&
        (list.length === 0 && value.length > 0 ? (
          <div className="interaction-default typography-body3 absolute top-11 z-40 w-full overflow-auto rounded-xl bg-background-elevated-light p-3 font-normal shadow-low">
            <label>{value}</label>
            <button
              type="button"
              className="right-4 absolute text-primary-light"
              onClick={() => onAdd(value)}
            >
              <div className="flex items-center gap-1">
                <Plus width="12" height="12" fill="#868E96" />
                <span className="text-content-tertiary-light">
                  새로등록
                </span>
              </div>
            </button>
          </div>
        ) : (
          <ul
            className={`scrollbar interaction-default shadow-low} absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low ${sizeStyle[size]}`}
          >
            {list.map((item: SpecialtyType) => {
              return (
                <Option
                  key={`${item.id}`}
                  name={name}
                  item={item.specialtyName}
                  size={"medium"}
                  active={active}
                  selected={selected}
                  onClick={onClick}
                  onActive={() => setActive(!active)}
                />
              );
            })}
          </ul>
        ))}
    </div>
  );
};

export default AddableSearchDropdown;
