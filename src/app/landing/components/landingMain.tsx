"use client";

import React, { useEffect } from "react";
import ProfileCard from "../../../components/molecules/profileCard";
import ArrowDirectionRight from "../../../../public/icons/ArrowDirectionRight.svg";
import { getProfileShowcase } from "@/app/landing/api";
import { ProfileShowcaseResponseType } from "@/app/landing/types";
import { useRouter } from "next/navigation";
import TextButton from "@/components/atoms/textButton";
import { routePaths } from "@/constants/routes";

const LandingMain = () => {
  const router = useRouter();
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
    <section className={`mx-[auto] flex w-[100%] flex-col gap-2`}>
      <div className="my-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
            새로 올라온 프로필
          </p>
          <TextButton
            type="secondary"
            size="large"
            onClick={() => {
              router.push(routePaths.profiles());
            }}
          >
            더 많은 프로필 보기
            <ArrowDirectionRight
              width="16"
              height="16"
              className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
            />
          </TextButton>
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "1272px",
            margin: "24px auto 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))",
            gap: "13px"
          }}
        >
          {profiles.map((profile, index) => (
            <ProfileCard
              profile={profile}
              key={profile.id}
              fetchProfiles={fetchProfileShowcase}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingMain;
