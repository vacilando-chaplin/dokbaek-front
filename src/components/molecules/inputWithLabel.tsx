import Input from "../atoms/input";
import Label from "../atoms/label";

interface InputWithLabelProps {
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  dropdown?: boolean;
  parameter?: string;
  icon?: string;
  maxLength: number;
  name: string;
  value: string;
  readOnly?: boolean;
  active?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onActive?: (name: string, state: boolean) => void;
}

const InputWithLabel = ({
  label,
  type,
  required,
  placeholder,
  dropdown,
  parameter,
  icon,
  maxLength,
  name,
  value,
  readOnly,
  active,
  onChange,
  onActive
}: InputWithLabelProps) => {
  return (
    <div className="h-auto w-full">
      <Label label={label} required={required} />
      <Input
        type={type}
        placeholder={placeholder}
        dropdown={dropdown}
        parameter={parameter}
        icon={icon}
        maxLength={maxLength}
        name={name}
        value={value}
        readOnly={readOnly}
        active={active}
        onChange={onChange}
        onActive={onActive}
      />
    </div>
  );
};

export default InputWithLabel;
