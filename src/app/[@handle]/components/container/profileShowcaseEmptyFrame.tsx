interface ProfileShowcaseEmptyFrameProps {
  text: string;
}

const ProfileShowcaseEmptyFrame = ({
  text
}: ProfileShowcaseEmptyFrameProps) => {
  return (
    <div className="flex h-auto w-full min-w-[166px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-150 bg-gray-50 py-12">
      <span className="typography-body2 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
        {text}
      </span>
    </div>
  );
};

export default ProfileShowcaseEmptyFrame;
