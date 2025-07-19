"use client";

import { useRecoilValue } from "recoil";
import ProfileInfoFrame from "./profileInfoFrame";
import ProfileEmptyFrame from "./profileEmpryFrame";
import { profileViewState } from "@/lib/recoil/handle/atom";

const ProfileInfoContainer = () => {
  const profileData = useRecoilValue(profileViewState);

  const { bornYear, height, weight } = profileData?.info || {};

  return (
    <>
      {bornYear ? (
        <ProfileInfoFrame title="기본 정보">123</ProfileInfoFrame>
      ) : (
        <ProfileEmptyFrame text="정보가 없어요." />
      )}
      <ProfileInfoFrame title="SNS">123</ProfileInfoFrame>
      <ProfileInfoFrame title="특기">123</ProfileInfoFrame>
      <ProfileInfoFrame title="자기소개">123</ProfileInfoFrame>
    </>
  );
};

export default ProfileInfoContainer;
