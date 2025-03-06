"use client";

import { useEffect, useRef, useState } from "react";
import { getLikedProfiles } from "@/app/likes/api";
import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import { useSearchParams } from "next/navigation";
import LikeProfiles from "./components/likeProfiles";

const Page = () => {
  const searchParams = useSearchParams();
  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);
  const [profilesData, setProfilesData] = useState<ProfilesResponseType>();

  useEffect(() => {
    const fetchProfiles = async () => {
      const page = 0;
      const size = 10;
      try {
        const res = await getLikedProfiles(page, size);
        console.log(res);
        setProfiles(res.content);
        setProfilesData(res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, [searchParams]);

  return (
    <div className="mt-11 w-[100%] justify-center gap-6 sm:w-[100%] md:w-[85%] lg:w-[80%]">
      <section className="container-max" style={{ margin: "50px auto" }}>
        <p className="mb-6 text-heading2 font-semibold text-content-primary-light">
          좋아요한 프로필
        </p>
        <LikeProfiles profiles={profiles} profilesData={profilesData} />
      </section>
    </div>
  );
};

export default Page;
