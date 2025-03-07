import React, { useEffect, useState } from "react";
import ProfileCard from "../../../components/molecules/profileCard";
import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import InfoCircle from "../../../../public/icons/InfoCircle.svg";
import Pagination from "@/components/atoms/pagination";
import { getLikedProfiles } from "@/app/likes/api";

const LikeProfiles = () => {
  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);
  const fetchProfiles = async () => {
    const page = 0;
    const size = 10;
    try {
      const res = await getLikedProfiles(page, size);
      console.log(res);
      setProfiles(res.content);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPage = 0;
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
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
        <div className="mb-[151px] h-[289px] w-[100%] rounded-lg bg-background-base-light">
          <div className="flex h-full flex-col items-center justify-center">
            <InfoCircle width="20" height="20" fill="#868E96" />
            <p className="typography-body2 mt-2 text-content-tertiary-light">
              좋아요한 프로필이 없어요.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default LikeProfiles;
