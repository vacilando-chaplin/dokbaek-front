"use client";

import { profileViewState } from "@/lib/recoil/handle/atom";
import ProfileInfoFrame from "../container/profileInfoFrame";
import { useRecoilValue } from "recoil";

const Introduction = () => {
  const profileData = useRecoilValue(profileViewState);

  const { introduction } = profileData?.info || {};

  return (
    introduction && (
      <ProfileInfoFrame title="자기소개">
        <p className="typography-body2 break-words font-normal text-content-primary-light dark:text-content-primary-dark">
          {introduction}
        </p>
      </ProfileInfoFrame>
    )
  );
};

export default Introduction;
