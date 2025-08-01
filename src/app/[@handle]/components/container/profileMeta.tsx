"use client";

import {
  handleNameEditModalState,
  isMyProfileState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Edit from "../../../../../public/icons/Edit.svg";

const ProfileMeta = () => {
  const profileData = useRecoilValue(profileViewState);
  const isMyProfile = useRecoilValue(isMyProfileState);

  const setHandleNameEditModal = useSetRecoilState(handleNameEditModalState);

  const date = new Date(profileData.updatedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const onHandleNameEditModalOpen = () => {
    setHandleNameEditModal(true);
  };

  return (
    <div className="flex h-auto w-full items-center justify-between gap-4 rounded-2xl bg-background-base_inverse-light px-5 py-3 text-content-on_color-light dark:bg-background-base_inverse-dark dark:text-static-black">
      <div className="flex flex-row items-center gap-3">
        <span className="typography-body1 font-semibold">
          {profileData.info?.name ?? ""}
        </span>
        {isMyProfile && (
          <div className="flex flex-row gap-1.5 rounded-lg bg-[#FFFFFF1A] px-1.5 py-0.5">
            <span className="typography-caption1 font-medium text-content-alternative-light dark:text-content-alternative-dark">
              {profileData.handleId}
            </span>
            <button type="button" onClick={onHandleNameEditModalOpen}>
              <Edit
                width="12"
                height="12"
                className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
              />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-3">
        {profileData.updatedAt && (
          <div className="typography-caption1 flex flex-row gap-1 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
            <span>최근 업데이트</span>
            <span>
              {year}.{month}.{day}
            </span>
          </div>
        )}
        <span className="typography-body2 font-medium text-content-on_color-light dark:text-content-on_color-dark">
          배우
        </span>
      </div>
    </div>
  );
};

export default ProfileMeta;
