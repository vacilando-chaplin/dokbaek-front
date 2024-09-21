import Image from "next/image";

interface ProfileButtonProps {
  text: string;
}

const ProfileButton = ({ text }: ProfileButtonProps) => {
  return (
    <button
      type="button"
      className="flex h-auto w-auto items-center gap-1 rounded-xl border border-border-default-light bg-background-surface-light px-5 py-3"
    >
      <Image src="/icons/Plus.svg" alt="account" width={14} height={14} />
      <div className="text-body3 font-medium leading-body3 tracking-body3">
        {text} 추가
      </div>
    </button>
  );
};

export default ProfileButton;
