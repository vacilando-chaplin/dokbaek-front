"use client";

import { sizeStyleType } from "@/lib/types";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import Option from "../atoms/option";
import HelperText from "../atoms/helperText";
import { AnimatePresence, motion } from "framer-motion";

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
    large: "rounded-[14px] h-10",
    medium: "rounded-xl h-10",
    small: "rounded-lg h-7 px-0 pl-2 pr-2 py-[3px]"
  };

  const dropdonwStyle: sizeStyleType = {
    large: "rounded-[14px] top-11",
    medium: "rounded-xl top-11",
    small: "rounded-lg top-8"
  };

  return (
    <div className="relative flex w-full flex-col gap-1 font-normal">
      <div
        className={`${sizeStyle[size]} interaction-default flex h-10 w-full cursor-pointer flex-row items-center gap-1 border border-border-default-light bg-background-surface-light px-3 py-[11px] focus-within:border-border-active-light hover:border-border-active-light dark:border-border-default-dark dark:bg-background-surface-dark dark:focus-within:border-border-active-dark dark:hover:border-border-active-dark`}
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
          <ArrowTriangleDown
            width="16"
            height="16"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
        </button>
      </div>
      {helperText && <HelperText type="info" text={helperText} />}
      <AnimatePresence initial={false}>
        {active && (
          <motion.ul
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 400, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={`scrollbar dark:dark-scrollbar-dropdown absolute top-11 z-40 h-auto max-h-[400px] w-full list-none flex-col overflow-auto bg-background-elevated-light p-2 shadow-low dark:bg-background-elevated-dark ${dropdonwStyle[size]}`}
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectDropdown;
