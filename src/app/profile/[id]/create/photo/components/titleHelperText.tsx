interface TitleHelperTextProps {
  text: string;
}

const TitleHelperText = ({ text }: TitleHelperTextProps) => {
  return (
    <label className="typography-body3 font-regular text-content-tertiary-light">
      {text}
    </label>
  );
};

export default TitleHelperText;
