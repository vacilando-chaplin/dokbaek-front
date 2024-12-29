import Plus from "../../../public/icons/Plus.svg";

interface ProfileButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileButton = ({ text, onClick }: ProfileButtonProps) => {
  return (
    <button
      type="button"
      className="flex h-auto w-fit items-center gap-1 rounded-xl border border-border-default-light bg-background-surface-light px-5 py-3 text-content-primary-light"
      onClick={onClick}
    >
      <Plus width="14" height="14" fill="#868E96" />
      <div className="text-body3 font-medium leading-body3 tracking-body3">
        {text}
      </div>
    </button>
  );
};

export default ProfileButton;
