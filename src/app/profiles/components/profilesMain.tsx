import React, { useEffect, useState } from "react";
import ProfileCard from "../../../components/molecules/profileCard";
import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import Pagination from "@/components/atoms/pagination";
interface ProfilesMainProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
  fetchProfiles: () => void;
}
const ProfilesMain = ({
  profiles,
  profilesData,
  fetchProfiles
}: ProfilesMainProps) => {
  const totalPage = profilesData?.totalPages || 0;
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <section className="grid w-[100%] max-w-[928px]">
      {profiles?.length > 0 ? (
        <div>
          <div
            style={{
              display: "grid",
              gap: "13px",
              gridTemplateColumns: "repeat(auto-fill, minmax(184px, 1fr))"
            }}
          >
            {profiles.map((profile) => (
              <ProfileCard
                profile={profile}
                key={profile.id}
                fetchProfiles={fetchProfiles}
              />
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
        <div className="h-[293px] w-[100%] rounded-lg border border-gray-150 bg-background-base-light dark:border-gray-700 dark:bg-background-base-dark">
          <div className="flex h-full flex-col items-center justify-center">
            <p className="typography-body1 text-content-primary-light dark:text-content-primary-dark">
              찾으시는 배우가 없습니다.
            </p>
            <p className="typography-body2 text-content-tertiary-light dark:text-content-tertiary-dark">
              다른 조건으로 검색해보세요.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilesMain;
