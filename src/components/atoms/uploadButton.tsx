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
      "bg-accent-primary-light hover:bg-hover-primary active:bg-pressed-primary text-static-white",
    primaryOutlined:
      "bg-background-surface-light hover:bg-hover-primaryOutlined active:bg-pressed-primaryOutlined text-accent-primary-light border border-accent-primary-light",
    secondaryOutlined:
      "bg-background-surface-light hover:bg-hover-secondaryOutlined active:bg-pressed-secondaryOutlined text-content-primary-light border border-border-default-light",
    negative:
      "bg-state-negative-light hover:bg-hover-negative active:bg-pressed-negative text-static-white",
    negativeOutlined: "bg-state-negative-light text-state-negative-light",
    black: "bg-content-primary-light text-static-white"
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
