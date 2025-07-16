"use client";

import Tooltip from "@/components/atoms/tooltip";
import UploadButton from "@/components/atoms/uploadButton";
import {
  isMyProfileState,
  mainPhotoModalState
} from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Account from "../../../../../public/icons/Account.svg";
import Plus from "../../../../../public/icons/Plus.svg";

interface MainPhotoEmptyProps {
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainPhotoEmpty = ({ onSelectFile }: MainPhotoEmptyProps) => {
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
      </div>
    </div>
  );
};

export default MainPhotoEmpty;
