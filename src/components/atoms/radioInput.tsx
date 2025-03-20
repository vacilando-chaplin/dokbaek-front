interface RadioInputProps {
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
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
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={() => onChange(value)}
      className="peer hidden"
    />
  );
};

export default RadioInput;
