import RadioInput from "../atoms/radioInput";

interface RadioButtonProps {
  label: string;
  id: string;
  value: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const RadioButton = ({
  label,
  id,
  value,
  name,
  checked,
  disabled,
  onChange
}: RadioButtonProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-2 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <RadioInput
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <div
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-border-default-light hover:border-accent-primary-light peer-checked:border-[5px] peer-checked:border-accent-primary-light dark:border-border-default-dark dark:hover:border-accent-primary-dark dark:peer-checked:border-accent-primary-dark`}
      >
        {checked && (
          <div className="h-2 w-2 rounded-full bg-background-surface-light dark:bg-background-surface-dark" />
        )}
      </div>
      <span className="typography-body3 text-content-primary-light dark:text-content-primary-dark">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
