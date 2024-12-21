interface NavButtonProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const NavButton = ({ name, onClick }: NavButtonProps) => {
  return (
    <button
      type="button"
      className="text-caption1 font-medium leading-caption1 -tracking-caption1 text-content-tertiary-light"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default NavButton;
