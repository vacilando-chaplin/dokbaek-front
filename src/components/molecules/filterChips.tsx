import ChipItem from "../atoms/chipItem";
import ArrowDirectionUpDown from "../../../public/icons/ArrowDirectionUpDown.svg";
import ArrowChevronDown from "../../../public/icons/ArrowChevronDown.svg";
import Refresh from "../../../public/icons/Refresh.svg";

interface FilterChipsProps {
  kind: string;
  state: string;
  text: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FilterChips = ({
  kind,
  state,
  text,
  disabled,
  onClick
}: FilterChipsProps) => {
  return (
    <div className="flex flex-row gap-2">
      <ChipItem state={state} disabled={disabled} onClick={onClick}>
        {kind === "filter" && (
          <ArrowDirectionUpDown
            width="16"
            height="16"
            fill={
              state === "selected"
                ? disabled
                  ? "#9FD4FF"
                  : "#1E85EF"
                : disabled
                  ? "#CED4DA"
                  : "#212529"
            }
          />
        )}
        {kind === "reset" && (
          <Refresh
            width="12"
            height="12"
            fill={disabled ? "#CED4DA" : "#212529"}
          />
        )}
        {text}
        {kind === "dropdown" && (
          <ArrowChevronDown
            width="12"
            height="12"
            fill={
              state === "selected"
                ? disabled
                  ? "#9FD4FF"
                  : "#1E85EF"
                : disabled
                  ? "#CED4DA"
                  : "#5E656C"
            }
          />
        )}
      </ChipItem>
    </div>
  );
};

export default FilterChips;
