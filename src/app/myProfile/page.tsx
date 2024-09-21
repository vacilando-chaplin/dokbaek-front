"use client";

import ProfileMain from "@/components/organisms/profileMain";
import { profile } from "@/data/atom";
import { useRecoilValue } from "recoil";

const myProfile = () => {
  const data = useRecoilValue(profile);
  console.log(data);
  return (
    <div className="flex h-full w-full flex-row justify-between">
      <ProfileMain info={data.info} />
    </div>
  );
};

export default myProfile;
