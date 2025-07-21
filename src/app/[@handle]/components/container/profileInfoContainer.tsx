"use client";

import ProfileInfoFrame from "./profileInfoFrame";
import BasicInfo from "../info/basicInfo";
import SocialLinks from "../info/socialLinks";
import Introduction from "../info/introduction";
import Specialty from "../info/specialty";

const ProfileInfoContainer = () => {
  return (
    <>
      <BasicInfo />
      <SocialLinks />
      <Specialty />
      <Introduction />
    </>
  );
};

export default ProfileInfoContainer;
