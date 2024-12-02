interface MenuItemProps {
  name: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MenuItem = ({ name, active, onClick }: MenuItemProps) => {
  return (
    <button
      className={`flex h-auto w-full rounded-lg px-3 py-4 text-body2 leading-[21px] tracking-body2 outline-none ${active ? "bg-accent-light-light font-semibold text-accent-primary-light" : "font-normal text-content-secondary-light"}`}
      type="button"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default MenuItem;
