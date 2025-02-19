import React, { useEffect } from "react";
import ProfileCard from "../../molecules/landing/profileCard";
import { getProfiles } from "@/app/profiles/api";
import { ProfileShowcaseResponseType } from "@/app/landing/types";

const ProfilesMain = () => {
  const [profiles, setProfiles] = React.useState<ProfileShowcaseResponseType[]>(
    []
  );

  const fetchProfileShowcase = async () => {
    const res = await getProfiles({});
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
            배우 찾기
          </p>
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

export default ProfilesMain;
