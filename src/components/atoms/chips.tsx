import { sizeStyleType } from "@/types/types";
import X from "../../../public/icons/X.svg";

interface ChipsProps {
  size: string;
  text: string;
  icon?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Chips = ({ size, text, icon, disabled, onClick }: ChipsProps) => {
  const sizeStyle: sizeStyleType = {
    large: "py-1.5 px-3 gap-1 typography-body2",
    medium: "py-[5px] px-2 gap-0.5 typography-body3",
    small: ""
  };

  const sizeStyleWithIcon: sizeStyleType = {
    large: "py-1.5 pr-2 pl-3 gap-1 typography-body2",
    medium: "py-[5px] pr-1 pl-2 gap-0.5 typography-body3",
    small: ""
  };

  return (
    <div
      className={`flex h-auto w-auto flex-row items-center rounded-lg bg-gray-100 transition-colors duration-100 ease-linear ${disabled && "border border-border-disabled-light"} ${icon ? sizeStyleWithIcon[size] : sizeStyle[size]}`}
    >
      <label
        className={`${disabled ? "text-content-disabled-light" : "text-content-primary-light"}`}
      >
        {text}
      </label>
      {icon && (
        <button
          type="button"
          className={`rounded-[4px] p-0.5 transition-colors duration-100 ease-linear hover:bg-[#f2f2f2] active:bg-[#E6E6E6] ${disabled && "bg-background-disabled-light"}`}
          onClick={onClick}
        >
          <X
            width="12"
            height="12"
            fill={`${disabled ? "#CED4DA" : "#868E96"}`}
          />
        </button>
      )}
    </div>
  );
};

export default Chips;
