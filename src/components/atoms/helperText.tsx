interface HelperTextProps {
  type: string;
  text: string;
}

interface TypeStyleType {
  info: string;
  success: string;
  error: string;
  [key: string]: string;
}

const HelperText = ({ type, text }: HelperTextProps) => {
  const typeStyle: TypeStyleType = {
    info: "text-content-secondary-light",
    success: "text-state-positive-light",
    error: "text-state-negative-light"
  };

  return (
    <label className={`typography-caption1 font-regular ${typeStyle[type]}`}>
      {text}
    </label>
  );
};

export default HelperText;
