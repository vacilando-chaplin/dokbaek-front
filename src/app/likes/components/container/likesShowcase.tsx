"use client";

import ProfileCard from "@/components/molecules/profileCard";
import { LikedProfileShowcaseType } from "../../types";
import { useState } from "react";
import LikesEmptyFrame from "./likesEmptyFrame";
import Pagination from "@/components/organisms/pagination";

interface LikesShowcaseProps {
  currentPage: number;
  likedProfiles: LikedProfileShowcaseType;
}

const LikesShowcase = ({ currentPage, likedProfiles }: LikesShowcaseProps) => {
  const [likedProfileShowcase, setLikedProfileShowcase] = useState(
    likedProfiles.profiles
  );

  const onUnLike = (profileId: number) => {
    setLikedProfileShowcase((prev) =>
      prev.filter((profile) => profile.id !== profileId)
    );
  };

  return likedProfileShowcase.length > 0 ? (
    <div className="grid w-full gap-6">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] gap-[13px]">
        {likedProfileShowcase.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onUnlike={onUnLike} />
        ))}
      </div>
      {likedProfiles.totalPages > 1 && (
        <Pagination
          pageName="likes"
          currentPage={currentPage}
          totalPages={likedProfiles.totalPages}
        />
      )}
    </div>
  ) : (
    <LikesEmptyFrame />
  );
};

export default LikesShowcase;
