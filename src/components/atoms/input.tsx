import Youtube from "../../../public/icons/YouTube.svg";
import Instagram from "../../../public/icons/Instagram.svg";
import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";

interface InputProps {
  type: string;
  placeholder?: string;
  dropdown?: boolean;
  parameter?: string;
  icon?: string;
  maxLength: number;
  name: string;
  value: string;
  readOnly?: boolean;
  active?: boolean;
  limit?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onActive?: any;
}

const Input = ({
  type,
  placeholder,
  dropdown,
  parameter,
  icon,
  maxLength,
  name,
  value,
  readOnly,
  active,
  limit,
  onChange,
  onActive
}: InputProps) => {
  const youtubeShortUrl =
    value.length >= 1 && value.includes("https://youtu.be/");
  return (
    <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-border-default-light bg-background-surface-light px-3 py-[11px] text-body3 font-normal leading-body3 tracking-body3 text-content-primary-light placeholder-content-alternative-light">
      {icon === "instagram" && (
        <Instagram
          width="16"
          height="16"
          fill={value ? "#212529" : "#5E656C"}
        />
      )}
      {icon === "youtube" && (
        <Youtube width="16" height="16" fill={value ? "#212529" : "#5E656C"} />
      )}
      {icon && value ? (
        <input
          className={`w-full outline-none ${value.includes(`https://www.${icon}.com/`) || youtubeShortUrl ? "text-content-primary-light" : "text-state-negative-light"}`}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          name={name}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
      ) : (
        <input
          className={`w-full outline-none ${readOnly && "cursor-pointer text-left"}`}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          name={name}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
      )}
      {dropdown && (
        <button
          type="button"
          className={`ml-auto flex transition-all duration-100 ease-linear ${active ? "rotate-180 transform" : ""}`}
          onClick={() => onActive(name, active)}
        >
          <ArrowTriangleDown width="16" height="16" fill="#212529" />
        </button>
      )}
      {parameter && (
        <label className="text-content-secondary-light">{parameter}</label>
      )}
      {limit && (
        <label className="text-[12px] text-[#787887]">
          {value.length}/{maxLength}
        </label>
      )}
    </div>
  );
};

export default Input;
