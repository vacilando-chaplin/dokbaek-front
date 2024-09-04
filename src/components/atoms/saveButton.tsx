interface SaveButtonProps {
  text: string;
  required?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SaveButton = ({ text, required, onClick }: SaveButtonProps) => {
  return (
    <button
      type="submit"
      className={`flex h-auto w-auto items-center justify-center gap-1.5 rounded-xl bg-accent-primary-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 text-static-white ${required ? "" : "opacity-40"}`}
      disabled={!required}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SaveButton;
