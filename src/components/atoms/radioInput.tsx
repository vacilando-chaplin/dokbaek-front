interface RadioInputProps {
  id: string;
  name: string;
  value: string | null;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: string | null) => void;
}
const RadioInput = ({
  id,
  name,
  value,
  checked,
  disabled,
  onChange
}: RadioInputProps) => {
  return (
    <input
      id={id}
      type="radio"
      name={name}
      value={value ?? ""}
      checked={checked}
      disabled={disabled}
      onChange={() => onChange(value)}
      className="peer hidden"
    />
  );
};

export default RadioInput;
