import Image from "next/image";

interface ButtonProps {
  icon?: string;
  rightIcon?: string;
  text: string;
  color?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  icon,
  rightIcon,
  text,
  color,
  disabled,
  onClick
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex h-auto w-auto items-center justify-center gap-1.5 rounded-xl border border-border-default-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 outline-none ${color ? color : "bg-background-surface-light text-content-primary-light"} ${disabled && "opacity-40"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="Button Icon" width={14} height={14} />}
      {text}
      {rightIcon && (
        <Image src={rightIcon} alt="Button Icon" width={14} height={14} />
      )}
    </button>
  );
};

export default Button;
