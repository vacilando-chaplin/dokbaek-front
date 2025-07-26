interface ProfileEmptyFrameProps {
  text: string;
}

const ProfileEmptyFrame = ({ text }: ProfileEmptyFrameProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 py-12">
      <span className="typography-body2 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
        {text}
      </span>
    </div>
  );
};

export default ProfileEmptyFrame;
