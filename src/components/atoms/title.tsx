interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className="typography-body1 font-semibold text-content-primary-light dark:text-content-primary-dark">
      {name}
    </h1>
  );
};

export default Title;
