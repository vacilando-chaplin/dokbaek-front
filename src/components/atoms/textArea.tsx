import { sizeStyleType } from "@/lib/types";

interface TextAreaProps {
  size: string;
  name: string;
  value: string;
  limit?: number;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea = ({
  size,
  name,
  value,
  limit,
  placeholder,
  onChange
}: TextAreaProps) => {
  const sizeStyle: sizeStyleType = {
    large: "rounded-[14px] py-3 px-4",
    medium: "rounded-xl py-2 px-3",
    small: "rounded-lg py-[3px] px-2"
  };

  return (
    <div className="flex h-40 w-full flex-col gap-1">
      <textarea
        name={name}
        value={value}
        maxLength={500}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        className={`scrollbar interaction-default typography-body3 h-[140px] w-full resize-none items-start gap-1 border border-border-default-light bg-background-surface-light font-normal text-content-primary-light placeholder-content-tertiary-light outline-none focus-within:border-border-active-light hover:border-border-active-light ${sizeStyle[size]}`}
      />
      {limit && (
        <label className="typography-caption1 flex h-fit w-full justify-end gap-1 font-normal text-content-secondary-light">
          {value?.length}/500
        </label>
      )}
    </div>
  );
};

export default TextArea;
