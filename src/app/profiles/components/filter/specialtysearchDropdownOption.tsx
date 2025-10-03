import { SpecialtyType } from "@/components/molecules/addableSearchDropdown";
import { sizeStyleType } from "@/lib/types";

interface SpecialtySearchDropdownOptionProps {
  item: SpecialtyType;
  size: string;
  selected: string | number;
  onClick: (specialty: SpecialtyType) => void;
  onActive: () => void;
}

const SpecialtySearchDropdownOption = ({
  item,
  size,
  selected,
  onClick,
  onActive
}: SpecialtySearchDropdownOptionProps) => {
  const sizeStyle: sizeStyleType = {
    large: "py-3 px-4 h-[46px]",
    medium: "py-2 px-3 h-[38px]",
    small: "py-2 px-3 h-[38px]"
  };

  return (
    <li
      className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-50 ${sizeStyle[size]} ${selected === item.id ? "bg-gray-50 hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-950" : "dark:hover:bg-background-surface-dark"}`}
      onClick={() => {
        onActive();
        onClick(item);
      }}
    >
      <button
        type="button"
        className={`typography-body3 flex w-full font-medium ${selected === item.id ? "font-semibold text-accent-primary-light dark:text-accent-primary-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
      >
        {item.specialtyName}
      </button>
    </li>
  );
};

export default SpecialtySearchDropdownOption;
