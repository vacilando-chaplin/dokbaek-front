"use client";

import { sizeStyleType } from "@/lib/types";

interface UploadButtonProps {
  children: React.ReactNode;
  type: string;
  size: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const UploadButton = ({
  children,
  type,
  size,
  disabled,
  onClick,
  onChange
}: UploadButtonProps) => {
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
    <div className="flex items-center gap-1">
      <label
        className={`interaction-default flex h-auto w-auto items-center justify-center gap-1 font-medium outline-none ${sizeStyle[size]} ${typeStyle[type]} ${disabled ? "opacity-40" : "cursor-pointer"}`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled}
          onClick={onClick}
          onChange={onChange}
        />
        {children}
      </label>
    </div>
  );
};

export default UploadButton;
