import React from "react";
import TextButton from "../../atoms/textButton";
import ProfileCard from "../../molecules/landing/profileCard";
import { recentProfile } from "@/lib/types";
import ArrowDirectionRight from "../../../../public/icons/ArrowDirectionRight.svg";

const profiles: recentProfile[] = [
  {
    id: 1,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 2,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 3,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 4,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 5,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 6,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 7,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  },
  {
    id: 8,
    name: "송예빈",
    height: 164,
    weight: 48,
    bornYear: 1992
  }
];
const LandingMain = () => {
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
