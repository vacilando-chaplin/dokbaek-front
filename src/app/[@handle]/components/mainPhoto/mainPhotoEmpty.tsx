"use client";

import Tooltip from "@/components/atoms/tooltip";
import UploadButton from "@/components/atoms/uploadButton";
import {
  isMyProfileState,
  mainPhotoModalState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Account from "../../../../../public/icons/Account.svg";
import Plus from "../../../../../public/icons/Plus.svg";
import Heart from "../../../../../public/icons/Heart.svg";
import EyeOn from "../../../../../public/icons/EyeOn.svg";

interface MainPhotoEmptyProps {
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainPhotoEmpty = ({ onSelectFile }: MainPhotoEmptyProps) => {
  const profileData = useRecoilValue(profileViewState);
  const isMyProfile = useRecoilValue(isMyProfileState);

  const setMainPhotoModal = useSetRecoilState(mainPhotoModalState);

  const onMainPhotoModalOpen = () => {
    setMainPhotoModal({
      state: "add",
      active: true,
      name: "대표 사진 추가",
      buttonText: "추가"
    });
  };

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${(532 / 416) * 100}%` }}
    >
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border-default-light dark:border-border-default-dark">
        <Account
          width="40"
          height="40"
          className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
        />
        {isMyProfile && (
          <div className="relative flex justify-center">
            <UploadButton
              type="secondaryOutlined"
              size="medium"
              onClick={onMainPhotoModalOpen}
              onChange={(e) => onSelectFile(e)}
            >
              <Plus
                width="14"
                height="14"
                className="fill-current text-content-primary-light dark:text-content-primary-dark"
              />
              대표 사진 추가
            </UploadButton>
            <div className="absolute -top-10">
              <Tooltip placement="top" text="대표 사진을 추가하세요." />
            </div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex flex-row gap-1.5 rounded-lg bg-background-scrim-light px-2 py-1 dark:bg-background-scrim-dark">
          <div className="flex flex-row items-center gap-1">
            <Heart
              width="14"
              height="14"
              className="fill-current text-static-white"
            />
            <span className="typography-caption1 font-medium text-static-white">
              {profileData.likesCount ?? 0}
            </span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <EyeOn
              width="14"
              height="14"
              className="fill-current text-static-white"
            />
            <span className="typography-caption1 font-medium text-static-white">
              {profileData.viewsCount ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPhotoEmpty;
