"use client";

import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";
import ProfileInfoFrame from "../container/profileInfoFrame";
import ProfileEmptyFrame from "../container/profileEmpryFrame";
import { useGetFinalEducation } from "../../hooks";
import { educationEngList, educationList } from "@/lib/data";

const BasicInfo = () => {
  const profileData = useRecoilValue(profileViewState);

  const { bornYear, height, weight } = profileData?.info || {};
  const education = profileData?.education || [];

  const finalEducation = useGetFinalEducation(education);
  const statusIndex =
    finalEducation &&
    educationEngList.findIndex((status) => status === finalEducation.status);
  const status = statusIndex !== null ? educationList[statusIndex] : "";

  return bornYear ? (
    <ProfileInfoFrame title="기본 정보">
      <div className="typography-body2 flex flex-row items-center gap-1 font-normal text-content-primary-light dark:text-content-primary-dark">
        {bornYear && (
          <span>
            {bornYear}년생 {(height || height) && "·"}
          </span>
        )}
        {height && <span>{height}cm</span>}
        {weight && <span>{weight}kg</span>}
      </div>
      <span className="typography-body2">
        {finalEducation && (
          <div>
            <span>{finalEducation.school.name} </span>
            <span>{finalEducation.major} 전공 </span>
            <span>{status}</span>
          </div>
        )}
      </span>
      <span className="typography-body2"></span>
    </ProfileInfoFrame>
  ) : (
    <ProfileEmptyFrame text="정보가 없어요." />
  );
};

export default BasicInfo;
