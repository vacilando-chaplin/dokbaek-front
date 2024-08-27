interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <h1 className="text-body1 font-semibold leading-body1 tracking-body1 text-content-primary-light">
      {name}
    </h1>
  );
};

export default Title;
