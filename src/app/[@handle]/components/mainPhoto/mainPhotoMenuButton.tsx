"use client";

import { useRecoilValue } from "recoil";
import DotsVertical from "../../../../../public/icons/DotsVertical.svg";
import { isMyProfileState } from "@/lib/recoil/handle/atom";

interface MainPhotoMenuButtonProps {
  onActive: () => void;
}

const MainPhotoMenuButton = ({ onActive }: MainPhotoMenuButtonProps) => {
  const isMyProfile = useRecoilValue(isMyProfileState);

  return (
    isMyProfile && (
      <div className="absolute right-1 top-1">
        <button
          className="absolute right-1 top-1 h-auto w-auto rounded-[10px] border border-border-default-light bg-background-surface-light p-2 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          type="button"
          onClick={onActive}
        >
          <DotsVertical
            width="20"
            height="20"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
        </button>
      </div>
    )
  );
};

export default MainPhotoMenuButton;
