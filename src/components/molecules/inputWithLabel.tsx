import Input from "../atoms/input";
import Label from "../atoms/label";

interface InputWithLabelProps {
  name: string;
  text: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  dropdown?: boolean;
  parameter?: string;
}

const InputWithLabel = ({
  name,
  text,
  type,
  required,
  placeholder,
  dropdown,
  parameter
}: InputWithLabelProps) => {
  return (
    <div className="h-auto w-full">
      <Label name={name} required={required} />
      <Input
        text={text}
        type={type}
        placeholder={placeholder}
        dropdown={dropdown}
        parameter={parameter}
      />
    </div>
  );
};

export default InputWithLabel;
