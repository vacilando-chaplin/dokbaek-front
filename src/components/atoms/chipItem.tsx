interface ChipItemProps {
  children: React.ReactNode;
  state: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ChipItem = ({ children, state, disabled, onClick }: ChipItemProps) => {
  return (
    <button
      type="button"
<<<<<<< HEAD
      className={`typography-body3 flex h-auto w-auto items-center justify-center gap-1 rounded-lg border bg-background-surface-light px-3 py-[5px] font-semibold transition-colors duration-100 ease-linear hover:border-hover-chip active:border-pressed-chip ${state === "selected" ? "border-accent-primary-light text-accent-primary-light" : "border-border-default-light text-content-primary-light"} ${disabled && state === "selected" ? "border-accent-disabled-light text-accent-disabled-light" : "border-border-disabled-light text-content-disabled-light"}`}
=======
      className={`flex h-auto w-auto items-center justify-center gap-1 rounded-lg border bg-background-surface-light px-3 py-[5px] transition-colors duration-100 ease-linear hover:border-hover-chip active:border-pressed-chip ${state === "selected" ? "border-accent-primary-light text-accent-primary-light" : "border-border-default-light text-content-primary-light"} ${disabled && state === "selected" ? "border-accent-disabled-light text-accent-disabled-light" : "border-border-disabled-light text-content-disabled-light"}`}
>>>>>>> 7309b16 (atoms checkbox 생성)
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ChipItem;
