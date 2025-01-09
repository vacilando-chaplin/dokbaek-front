interface ListItemProps {
  children: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ListItem = ({ children, active, disabled, onClick }: ListItemProps) => {
  return (
    <button
      type="button"
      className={`typography-body2 flex h-auto w-full gap-2 rounded-lg px-4 py-3 outline-none active:bg-[#EBEBEB] ${active ? "bg-accent-light-light font-semibold text-accent-primary-light" : "font-normal text-content-secondary-light"} ${disabled && "font-medium text-content-disabled-light"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ListItem;
