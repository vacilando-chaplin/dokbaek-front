interface ButtonProps {
  icon?: string;
  text: string;
  color?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ icon, text, color, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex h-auto w-auto items-center justify-center gap-1.5 rounded-xl border border-border-default-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 outline-none ${color ? color : "bg-background-surface-light text-content-primary-light"} ${disabled && "opacity-40"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="Button Icon" className="h-3.5 w-3.5" />}
      {text}
    </button>
  );
};

export default Button;
