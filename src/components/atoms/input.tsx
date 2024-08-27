interface InputProps {
  text: string;
  placeholder?: string;
}

const Input = ({ text, placeholder }: InputProps) => {
  return (
    <input
      className="flex h-10 w-full items-center gap-2 rounded-xl border border-border-default-light bg-background-surface-light px-3 py-[11px] text-body3 font-normal leading-body3 tracking-body3 text-content-alternative-light"
      value={text}
      placeholder={placeholder}
    />
  );
};

export default Input;
