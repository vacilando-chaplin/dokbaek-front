interface ButtonProps {
  icon?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ icon, text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex h-auto w-auto items-center justify-center gap-1.5 rounded-xl border border-border-default-light bg-background-surface-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 text-content-primary-light outline-none"
      onClick={onClick}
    >
      {icon && <img src={icon} alt="Button Icon" className="h-3.5 w-3.5" />}
      {text}
    </button>
  );
};

export default Button;
