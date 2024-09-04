interface HelperTextProps {
  text: string;
}

const HelperText = ({ text }: HelperTextProps) => {
  return (
    <label className="text-caption1 font-regular leading-caption1 tracking-caption1 text-content-secondary-light">
      {text}
    </label>
  );
};

export default HelperText;
