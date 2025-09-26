"use client";

import ProfileCard from "@/components/molecules/profileCard";
import { LikedProfileShowcaseType } from "../../types";
import { useState } from "react";

interface LikesShowcaseProps {
  likedProfiles: LikedProfileShowcaseType;
}

const LikesShowcase = ({ likedProfiles }: LikesShowcaseProps) => {
  const [likedProfileShowcase, setLikedProfileShowcase] =
    useState(likedProfiles);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] gap-[13px]">
      {likedProfileShowcase.profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default LikesShowcase;
