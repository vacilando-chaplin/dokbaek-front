import Plus from "../../../public/icons/Plus.svg";

interface CreateButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <button
      className="flex h-auto w-auto flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-accent-primary-light"
      onClick={onClick}
    >
      <Plus width="12" height="12" fill="#1E85EF" />
      추가
    </button>
  );
};

export default CreateButton;
