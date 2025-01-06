import { sizeStyleType } from "@/types/types";

interface OptionProps {
  name: string;
  item: string;
  size: string;
  active: boolean;
  selected: string;
  onClick: (name: string, item: string) => void;
  onActive: (name: string, state: boolean) => void;
}

const Option = ({
  name,
  item,
  size,
  active,
  selected,
  onClick,
  onActive
}: OptionProps) => {
  const sizeStyle: sizeStyleType = {
    large: "py-3 px-4 h-[46px]",
    medium: "py-2 px-3 h-[38px]",
    small: "py-2 px-3 h-[38px]"
  };

  return (
    <li
      className={`flex w-full cursor-pointer items-center gap-2 rounded-md bg-background-surface-light px-3 py-2 hover:bg-gray-50 active:bg-gray-150 ${sizeStyle[size]} ${selected === item && "bg-gray-50"}`}
      onClick={() => {
        onClick(name, item);
        onActive(name, active);
      }}
    >
      <button
        type="button"
        className={`flex w-full text-body3 font-medium leading-body3 tracking-body3 ${selected === item ? "font-semibold text-accent-primary-light" : "text-content-primary-light"}`}
      >
        {item}
      </button>
    </li>
  );
};

export default Option;
