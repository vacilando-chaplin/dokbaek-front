interface ProfileInfoFrameProps {
  title: string;
  children: React.ReactNode;
}

const ProfileInfoFrame = ({ title, children }: ProfileInfoFrameProps) => {
  return (
    <div
      className={`flex h-auto w-full flex-col rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-900 dark:bg-gray-950 ${title === "자기소개" ? "gap-4" : "gap-2"}`}
    >
      <div className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
        {title}
      </div>
      {children}
    </div>
  );
};

export default ProfileInfoFrame;
