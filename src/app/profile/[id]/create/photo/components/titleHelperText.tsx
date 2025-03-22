interface TitleHelperTextProps {
  text: string;
}

const TitleHelperText = ({ text }: TitleHelperTextProps) => {
  return (
    <label className="typography-body3 font-regular text-content-tertiary-light dark:text-content-tertiary-dark">
      {text}
    </label>
  );
};

export default TitleHelperText;
