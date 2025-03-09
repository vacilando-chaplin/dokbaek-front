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
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 border-border-default-light hover:border-blue-600 peer-checked:border-[5px] peer-checked:border-blue-600`}
      >
        {checked && (
          <div className="h-2.5 w-2.5 rounded-full bg-background-surface-light" />
        )}
      </div>
      <span className="typography-body3 text-content-primary-light">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
