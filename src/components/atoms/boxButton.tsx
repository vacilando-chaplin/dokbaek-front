import { sizeStyleType } from "@/lib/types";

interface BoxButtonProps {
  children: React.ReactNode;
  type: string;
  size: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface typeStyleType {
  primary: string;
  primaryOutlined: string;
  secondaryOutlined: string;
  negative: string;
  negativeOutlined: string;
  black: string;
  [key: string]: string;
}

const BoxButton = ({
  children,
  type,
  size,
  disabled,
  onClick
}: BoxButtonProps) => {
  const sizeStyle: sizeStyleType = {
    large: "rounded-[14px] py-3.5 px-6 gap-2 typography-body2",
    medium: "rounded-xl py-[11px] px-5 gap-1.5 typography-body3",
    small: "rounded-[10px] py-[7px] px-3 gap-1 typography-body3"
  };

  const typeStyle: typeStyleType = {
    primary:
      "bg-accent-primary-light hover:bg-hover-primary active:bg-pressed-primary text-static-white",
    primaryOutlined:
      "bg-background-surface-light hover:bg-hover-primaryOutlined active:bg-pressed-primaryOutlined text-accent-primary-light border border-accent-primary-light",
    secondaryOutlined:
      "bg-background-surface-light hover:bg-hover-secondaryOutlined active:bg-pressed-secondaryOutlined text-content-primary-light border border-border-default-light",
    negative:
      "bg-state-negative-light hover:bg-hover-negative active:bg-pressed-negative text-static-white",
    negativeOutlined:
      "bg-state-negative-light text-state-negative-light hover:brightness-90 active:brightness-[80%]",
    black:
      "bg-content-primary-light text-static-white hover:brightness-90 active:brightness-[80%]"
  };

  return (
    <button
      type="button"
      className={`interaction-default flex h-auto w-auto items-center justify-center font-medium outline-none ${sizeStyle[size]} ${typeStyle[type]} ${disabled && "opacity-40"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BoxButton;
