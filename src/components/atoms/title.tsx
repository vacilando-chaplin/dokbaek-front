interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className="typography-body1 font-semibold text-content-primary-light">
      {name}
    </h1>
  );
};

export default Title;
