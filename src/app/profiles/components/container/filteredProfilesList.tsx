import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/home/types";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/organisms/pagination";
import ProfileCard from "@/components/molecules/profileCard";

interface FilteredProfilesListProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
}
const FilteredProfilesList = ({
  profiles,
  profilesData
}: FilteredProfilesListProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 0;

  return (
    <section className="grid w-full max-w-[928px]">
      {profiles?.length > 0 ? (
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(184px,1fr))] gap-[13px]">
            {profiles.map((profile) => (
              <ProfileCard profile={profile} key={profile.id} />
            ))}
          </div>
          <div className="mt-6">
            {profilesData && (
              <Pagination
                pageName="profiles"
                currentPage={currentPage}
                totalPages={profilesData?.totalPages || 0}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-[293px] w-full rounded-lg border border-gray-150 bg-background-base-light dark:border-gray-700 dark:bg-background-base-dark">
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

export default FilteredProfilesList;
