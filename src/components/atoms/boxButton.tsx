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
      "bg-accent-primary-light dark:bg-accent-primary-dark hover:brightness-[93%] active:brightness-[86%] text-static-white",
    primaryOutlined:
      "bg-background-surface-light hover:brightness-[97%] active:brightness-[94%] text-accent-primary-light border border-accent-primary-light dark:bg-background-surface-dark dark:text-accent-primary-dark dark:border-accent-primary-dark",
    secondaryOutlined:
      "bg-background-surface-light hover:brightness-[97%] active:brightness-[94%] text-content-primary-light border border-border-default-light dark:bg-background-surface-dark dark:text-content-primary-dark dark:border-border-default-dark",
    negative:
      "bg-state-negative-light hover:brightness-[93%] active:brightness-[86%] text-static-white dark:bg-state-negative-dark",
    negativeOutlined:
      "bg-state-negative-light text-state-negative-light hover:brightness-[97%] active:brightness-[94%] dark:text-state-negative-dark",
    black:
      "bg-content-primary-light text-static-white hover:brightness-[97%] active:brightness-[94%] dark:bg-content-primary-dark dark:text-static-black"
  };

  return (
    <button
      type="button"
      style={{ wordBreak: "keep-all", lineHeight: "16px" }}
      className={`interaction-default flex h-auto w-auto items-center justify-center font-medium outline-none ${sizeStyle[size]} ${typeStyle[type]} ${disabled && "opacity-40"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BoxButton;
