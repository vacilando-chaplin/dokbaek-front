import InfoCircle from "../../../../../public/icons/InfoCircle.svg";

const LikesEmptyFrame = () => {
  return (
    <div className="mb-[151px] h-[289px] w-full rounded-lg bg-background-base-light dark:bg-background-base-dark">
      <div className="flex h-full flex-col items-center justify-center">
        <InfoCircle
          width="20"
          height="20"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
        <p className="typography-body2 mt-2 text-content-tertiary-light dark:text-content-tertiary-dark">
          좋아요한 프로필이 없어요.
        </p>
      </div>
    </div>
  );
};

export default LikesEmptyFrame;
