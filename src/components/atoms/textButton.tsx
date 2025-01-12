import { sizeStyleType } from "@/types/types";

interface TextButtonProps {
  children: React.ReactNode;
  type: string;
  size: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface typeStyleType {
  primary: string;
  secondary: string;
  [key: string]: string;
}

const TextButton = ({
  children,
  type,
  size,
  disabled,
  onClick
}: TextButtonProps) => {
  const sizeStyle: sizeStyleType = {
    large: "py-3 px-6 gap-2 typography-body2",
    medium: "py-3 px-5 gap-1 typography-body3",
    small: "py-[5px] px-3 gap-1 typography-body3"
  };

  const typeStyle: typeStyleType = {
    primary:
      "text-accent-primary-light hover:bg-hover-primaryOutlined active:bg-pressed-primaryOutlined",
    secondary:
      "text-content-tertiary-light hover:bg-hover-secondaryOutlined active:bg-pressed-secondaryOutlined"
  };

  return (
    <button
      type="button"
      className={`interaction-default flex h-auto w-auto items-center justify-center rounded-lg font-medium outline-none ${sizeStyle[size]} ${typeStyle[type]} ${disabled && "opacity-40"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TextButton;
