"use client";

import ProfileInfoFrame from "./profileInfoFrame";
import BasicInfo from "../info/basicInfo";
import SocialLinks from "../info/socialLinks";
import Introduction from "../info/introduction";

const ProfileInfoContainer = () => {
  return (
    <>
      <BasicInfo />
      <SocialLinks />
      <ProfileInfoFrame title="특기">123</ProfileInfoFrame>
      <Introduction />
    </>
  );
};

export default ProfileInfoContainer;
