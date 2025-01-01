import Image from "next/image";

interface ButtonProps {
  leftIcon?: string;
  rightIcon?: string;
  text: string;
  color?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const textButton = ({
  leftIcon,
  rightIcon,
  text,
  color,
  disabled,
  onClick
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex h-auto w-auto items-center justify-center gap-1.5 rounded-xl px-5 py-[11px] text-body2 font-medium leading-body3 tracking-body3 outline-none ${color ? color : "bg-background-surface-light text-content-primary-light"} ${disabled && "opacity-40"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && (
        <Image src={leftIcon} alt="Button Icon" width={14} height={14} />
      )}
      {text}
      {rightIcon && (
        <Image src={rightIcon} alt="Button Icon" width={14} height={14} />
      )}
    </button>
  );
};

export default textButton;
