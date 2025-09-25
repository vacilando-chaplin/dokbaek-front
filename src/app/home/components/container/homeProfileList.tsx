"use client";

import { useEffect, useState } from "react";
import { getProfileShowcase } from "@/app/home/api";
import { ProfileShowcaseResponseType } from "@/app/home/types";
import { MyProfileIdType } from "@/lib/types";
import HomeProfileListHeader from "./homeProfileListHeader";
import HomeProfileListShowcase from "./homeProfileListShowcase";

interface HomeProfileListProps {
  myProfileId: MyProfileIdType;
}

const HomeProfileList = ({ myProfileId }: HomeProfileListProps) => {
  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);

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
    <section className="mx-auto my-16 flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-6">
        <HomeProfileListHeader />
        <HomeProfileListShowcase
          profiles={profiles}
          myProfileId={myProfileId}
          fetchProfileShowcase={fetchProfileShowcase}
        />
      </div>
    </section>
  );
};

export default HomeProfileList;
