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
      className={`typography-body2 interaction-default flex h-auto w-full gap-2 rounded-lg px-4 py-3 outline-none ${active ? "bg-accent-light-light font-semibold text-accent-primary-light hover:bg-accent-light-light dark:bg-accent-light-dark dark:text-accent-primary-dark dark:hover:bg-accent-light-dark" : "font-normal text-content-secondary-light hover:bg-gray-50 dark:text-content-secondary-dark dark:hover:bg-gray-950"} ${disabled && "font-medium text-content-disabled-light dark:text-content-disabled-dark"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ListItem;
