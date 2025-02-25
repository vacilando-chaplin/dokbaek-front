interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="flex h-auto w-40 flex-col gap-1">
      <div className="typography-caption2 flex w-full flex-row items-center justify-between font-semibold">
        <span
          className={`${progress === 100 ? "text-accent-primary-light" : "text-content-secondary-light"}`}
        >
          프로필 완성도
        </span>
        <span
          className={`${progress === 100 ? "text-accent-primary-light" : "text-content-primary-light"}`}
        >
          {progress}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className={`h-1.5 rounded-full ${progress === 100 ? "bg-accent-primary-light" : "bg-content-primary-light"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
