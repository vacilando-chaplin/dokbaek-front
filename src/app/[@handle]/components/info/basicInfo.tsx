"use client";

import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";
import ProfileInfoFrame from "../container/profileInfoFrame";
import ProfileEmptyFrame from "../container/profileEmpryFrame";
import { educationEnum } from "@/lib/data";

const BasicInfo = () => {
  const profileData = useRecoilValue(profileViewState);

  const { bornYear, height, weight, email } = profileData?.info ?? {};
  const education = profileData?.education || [];

  return bornYear ? (
    <ProfileInfoFrame title="기본 정보">
      <div className="typography-body2 flex flex-row items-center gap-1 font-normal text-content-primary-light dark:text-content-primary-dark">
        {bornYear && (
          <span>
            {bornYear}년생 {(Number(height) > 0 || Number(weight) > 0) && "·"}
          </span>
        )}
        {Number(height) > 0 && <span>{height}cm</span>}
        {Number(weight) > 0 && <span>{weight}kg</span>}
      </div>
      {education.map((edu) => {
        return (
          <span
            key={edu.id}
            className="typography-body2 font-normal text-content-primary-light dark:text-content-primary-dark"
          >
            <div>
              <span>{edu.school.name} </span>
              <span>{edu.major} 전공 </span>
              <span>
                {educationEnum[edu.status as keyof typeof educationEnum]}
              </span>
            </div>
          </span>
        );
      })}
      {email && (
        <span className="typography-body2 font-normal text-content-primary-light dark:text-content-primary-dark">
          {email}
        </span>
      )}
    </ProfileInfoFrame>
  ) : (
    <ProfileEmptyFrame text="정보가 없어요." />
  );
};

export default BasicInfo;
