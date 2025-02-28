interface ChipItemProps {
  children: React.ReactNode;
  state: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ChipItem = ({ children, state, disabled, onClick }: ChipItemProps) => {
  return (
    <button
      type="button"
      className={`typography-body3 flex h-auto w-auto items-center justify-center gap-1 rounded-lg border bg-background-surface-light px-3 py-[3px] font-semibold transition-colors duration-100 ease-linear active:border-pressed-chip ${state === "selected" ? "border-accent-primary-light text-accent-primary-light" : "border-border-default-light text-content-primary-light"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ChipItem;
