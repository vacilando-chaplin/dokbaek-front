import LoadingSpinner from "../../../../public/icons/LoadingSpinner.svg";

const ProfileEditLoading = () => {
  return (
    <div className="flex w-[65vw] max-w-[728px] flex-col gap-3">
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
        <LoadingSpinner
          width="24"
          height="24"
          className="fill-current animate-spin text-content-primary-light dark:text-content-primary-dark"
        />
      </div>
    </div>
  );
};

export default ProfileEditLoading;
