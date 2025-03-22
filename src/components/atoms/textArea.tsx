import { sizeStyleType } from "@/lib/types";

interface TextAreaProps {
  size: string;
  name: string;
  value: string;
  limit?: number;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSave?: () => void;
}

const TextArea = ({
  size,
  name,
  value,
  limit,
  placeholder,
  onChange,
  onSave
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
        onBlur={onSave}
        className={`scrollbar dark:dark-scrollbar interaction-default typography-body3 h-[140px] w-full resize-none items-start gap-1 border border-border-default-light bg-background-surface-light font-normal text-content-primary-light placeholder-content-tertiary-light outline-none focus-within:border-border-active-light hover:border-border-active-light dark:border-border-default-dark dark:bg-background-surface-dark dark:text-content-primary-dark dark:placeholder-content-tertiary-dark dark:focus-within:border-border-active-dark dark:hover:border-border-active-dark ${sizeStyle[size]}`}
      />
      {limit && (
        <label className="typography-caption1 flex h-fit w-full justify-end gap-1 font-normal text-content-secondary-light dark:text-content-secondary-dark">
          {value ? value.length : 0}/500
        </label>
      )}
    </div>
  );
};

export default TextArea;
