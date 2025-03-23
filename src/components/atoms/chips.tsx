import { sizeStyleType } from "@/lib/types";
import X from "../../../public/icons/X.svg";

interface ChipsProps {
  text: string;
  size?: "large" | "medium" | "small";
  icon?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Chips = ({
  size = "medium",
  text,
  icon,
  disabled,
  onClick
}: ChipsProps) => {
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
      className={`flex h-auto w-auto flex-row items-center rounded-lg bg-gray-100 transition-colors duration-100 ease-linear dark:bg-gray-700 ${disabled && "border border-border-disabled-light dark:border-border-disabled-dark"} ${icon ? sizeStyleWithIcon[size] : sizeStyle[size]}`}
    >
      <label
        className={`${disabled ? "text-content-disabled-light dark:text-content-disabled-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
      >
        {text}
      </label>
      {icon && (
        <button
          type="button"
          className={`rounded-[4px] p-0.5 transition-colors duration-100 ease-linear hover:bg-[#f2f2f2] active:bg-[#E6E6E6] dark:hover:bg-gray-600 dark:active:bg-gray-600 ${disabled && "bg-background-disabled-light dark:bg-background-disabled-dark"}`}
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
