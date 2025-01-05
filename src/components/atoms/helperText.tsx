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
<<<<<<< HEAD
    <label className={`typography-caption1 font-regular ${typeStyle[type]}`}>
=======
    <label
      className={`text-caption1 font-regular leading-caption1 tracking-caption1 ${typeStyle[type]}`}
    >
>>>>>>> c911aa7 (helperText type 속성 추가)
      {text}
    </label>
  );
};

export default HelperText;
