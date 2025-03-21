import { sizeStyleType } from "@/lib/types";

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
      className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-50${sizeStyle[size]} ${selected === item ? "bg-gray-50 hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-950" : "dark:hover:bg-background-surface-dark"}`}
      onClick={() => {
        onClick(name, item);
        onActive(name, active);
      }}
    >
      <button
        type="button"
        className={`typography-body3 flex w-full font-medium ${selected === item ? "font-semibold text-accent-primary-light dark:text-accent-primary-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
      >
        {item}
      </button>
    </li>
  );
};

export default Option;
