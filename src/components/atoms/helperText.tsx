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
    info: "text-content-secondary-light dark:text-content-secondary-dark",
    success: "text-state-positive-light dark:text-state-positive-dark",
    error: "text-state-negative-light dark:text-state-negative-dark"
  };

  return (
    <label className={`typography-caption1 font-regular ${typeStyle[type]}`}>
      {text}
    </label>
  );
};

export default HelperText;
