interface InputProps {
  type: string;
  text: string;
  placeholder?: string;
  dropdown?: boolean;
  parameter?: string;
  icon?: string;
}

const Input = ({
  type,
  text,
  placeholder,
  dropdown,
  parameter,
  icon
}: InputProps) => {
  return (
    <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-border-default-light bg-background-surface-light px-3 py-[11px] text-body3 font-normal leading-body3 tracking-body3 text-content-primary-light placeholder-content-alternative-light">
      {icon && (
        <img
          src={icon}
          alt="link"
          className={`h-4 w-4 ${text ? "fill-content-primary-light" : "fill-content-secondary-light"}`}
        />
      )}
      <input
        className="w-full outline-none"
        value={text}
        type={type}
        placeholder={placeholder}
      />
      {dropdown && (
        <button type="button" className="ml-auto flex">
          <img
            src="/icons/ArrowTriangleDown.svg"
            alt="dropdown"
            className="min-h-4 min-w-4"
          />
        </button>
      )}
      {parameter && (
        <label className="text-content-secondary-light">{parameter}</label>
      )}
    </div>
  );
};

export default Input;
