import ProfileCard from "@/components/molecules/profileCard";
import { ProfileShowcaseResponseType } from "../../types";
import { MyProfileIdType } from "@/lib/types";

interface HomeProfileListShowcaseProps {
  profiles: ProfileShowcaseResponseType[];
  myProfileId: MyProfileIdType;
  fetchProfileShowcase: () => void;
}

const HomeProfileListShowcase = ({
  profiles,
  myProfileId,
  fetchProfileShowcase
}: HomeProfileListShowcaseProps) => {
  return (
    <div className="mx-auto mt-6 grid w-full max-w-[1272px] grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] gap-[13px]">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          myProfileId={myProfileId}
          fetchProfiles={fetchProfileShowcase}
        />
      ))}
    </div>
  );
};

export default HomeProfileListShowcase;
