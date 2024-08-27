import Input from "../atoms/input";
import Label from "../atoms/label";

interface InputWithLabelProps {
  name: string;
  required: boolean;
  placeholder?: string;
}

const InputWithLabel = ({
  name,
  required,
  placeholder
}: InputWithLabelProps) => {
  return (
    <div className="h-auto w-full">
      <Label name={name} required={required} />
      <Input text="" placeholder={placeholder} />
    </div>
  );
};

export default InputWithLabel;
