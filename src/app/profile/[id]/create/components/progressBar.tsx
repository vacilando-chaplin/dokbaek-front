"use client";

import { profileProgress } from "@/lib/recoil/profile/common/selector";
import { useRecoilValue } from "recoil";

const ProgressBar = () => {
  const progress = useRecoilValue(profileProgress);

  return (
    <div className="flex h-auto w-40 flex-col gap-1">
      <div className="typography-caption2 flex w-full flex-row items-center justify-between font-semibold">
        <span
          className={`${progress === 100 ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-secondary-light dark:text-content-secondary-dark"}`}
        >
          프로필 완성도
        </span>
        <span
          className={`${progress === 100 ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
        >
          {progress}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-background-surface-dark">
        <div
          className={`interaction-default h-1.5 rounded-full ${progress === 100 ? "bg-accent-primary-light dark:bg-accent-primary-dark" : "bg-content-primary-light dark:bg-content-primary-dark"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
