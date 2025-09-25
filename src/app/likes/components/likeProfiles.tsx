"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "../../../components/molecules/profileCard";
import { ProfileShowcaseResponseType } from "@/app/home/types";
import InfoCircle from "../../../../public/icons/InfoCircle.svg";
import { getLikedProfiles } from "@/app/likes/api";

const LikeProfiles = () => {
  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);

  const fetchProfiles = async () => {
    const page = 0;
    const size = 10;
    try {
      const res = await getLikedProfiles(page, size);
      setProfiles(res.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <section className="grid w-[100%] max-w-[1272px]">
      {profiles?.length > 0 ? (
        <div>
          <div
            style={{
              display: "grid",
              gap: "13px",
              gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))"
            }}
          >
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                fetchProfiles={fetchProfiles}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-[151px] h-[289px] w-[100%] rounded-lg bg-background-base-light dark:bg-background-base-dark">
          <div className="flex h-full flex-col items-center justify-center">
            <InfoCircle
              width="20"
              height="20"
              className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
            />
            <p className="typography-body2 mt-2 text-content-tertiary-light dark:text-content-tertiary-dark">
              좋아요한 프로필이 없어요.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default LikeProfiles;
