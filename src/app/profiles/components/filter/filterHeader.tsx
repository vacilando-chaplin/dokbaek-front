import Reset from "../../../../../public/icons/Reset.svg";
import ArrowChevronDown from "../../../../../public/icons/ArrowChevronDown.svg";

interface FilterHeaderProps {
  name: "gender" | "age" | "height" | "weight" | "specialty";
  title: "성별" | "나이" | "키" | "몸무게" | "특기";
  value?: string | null;
  isActive: boolean;
  onReset: () => void;
  onActive: () => void;
}

const FilterHeader = ({
  name,
  title,
  value,
  isActive,
  onReset,
  onActive
}: FilterHeaderProps) => {
  return (
    <div className="flex h-[22px] w-full flex-row items-center justify-between gap-2">
      <div className="flex w-full flex-row items-center gap-1">
        <span className="typography-body3 font-medium text-content-primary-light dark:text-content-primary-dark">
          {title}
        </span>
        <span className="typography-body3 font-semibold text-accent-primary-light dark:text-accent-primary-dark">
          {name === "gender" && (value === "U" || value === null) && "전체"}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <Reset
            width="12"
            height="12"
            className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
          />
          <span className="typography-caption1 break-keep font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
            초기화
          </span>
        </button>
        <button type="button" onClick={onActive}>
          <ArrowChevronDown
            width="16"
            height="16"
            className={`fill-current interaction-default text-content-tertiary-light dark:text-content-tertiary-dark ${isActive ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default FilterHeader;
