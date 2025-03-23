interface ProfileInfoContainerProps {
  title: string;
  introduction?: boolean;
  children: React.ReactNode;
}

const ProfileInfoContainer = ({
  title,
  introduction,
  children
}: ProfileInfoContainerProps) => {
  return (
    <div
      className={`typography-body2 flex h-auto w-full flex-col rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-normal text-content-primary-light dark:border-gray-900 dark:bg-gray-950 dark:text-content-primary-dark ${introduction ? "gap-4" : "gap-2"}`}
    >
      <div className="font-semibold">{title}</div>
      {children}
    </div>
  );
};

export default ProfileInfoContainer;
