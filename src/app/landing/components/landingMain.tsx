import React, { useEffect } from "react";
import TextButton from "../../../components/atoms/textButton";
import ArrowDirectionRight from "../../../../public/icons/ArrowDirectionRight.svg";
import { getProfileShowcase } from "@/app/landing/api";
import { ProfileShowcaseResponseType } from "@/app/landing/types";
import ProfileCard from "@/components/molecules/profileCard";

const LandingMain = () => {
  const [profiles, setProfiles] = React.useState<ProfileShowcaseResponseType[]>(
    []
  );

  const fetchProfileShowcase = async () => {
    const page = 0;
    const size = 8;
    const res = await getProfileShowcase(page, size);
    setProfiles(res.content);
  };

  useEffect(() => {
    fetchProfileShowcase();
  }, []);
  return (
    <section
      className={`mx-[auto] flex w-[100%] max-w-[1000px] flex-col gap-2`}
    >
      <div className="my-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-heading2 font-semibold text-content-primary-light">
            새로 올라온 프로필
          </p>
          <TextButton type="secondary" size="large">
            더 많은 프로필 보기
            <ArrowDirectionRight width="16" height="16" fill="#868E96" />
          </TextButton>
        </div>
        <div className="flex flex-wrap justify-start gap-2">
          {profiles.map((profile, index) => (
            <ProfileCard profile={profile} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingMain;
