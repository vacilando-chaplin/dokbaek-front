import React, { useEffect, useState } from "react";
import ProfileCard from "../../../components/molecules/profileCard";
import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import Pagination from "@/components/atoms/pagination";

interface LikeProfilesProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
}
const LikeProfiles = ({ profiles, profilesData }: LikeProfilesProps) => {
  const totalPage = profilesData?.totalPages || 0;
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

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
            {profiles.map((profile, index) => (
              <ProfileCard profile={profile} key={index} />
            ))}
          </div>
          <div className="mt-6">
            {totalPage > 0 && (
              <Pagination
                totalPage={Math.max(1, totalPage - 1)}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-[293px] w-[100%] rounded-lg border bg-background-base-light">
          <div className="flex h-full flex-col items-center justify-center">
            <p className="typography-body1">좋아요한 프로필이 없어요.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default LikeProfiles;
