import { MyProfileIdType, ProfileShowcaseType } from "@/lib/types";
import HomeProfileListHeader from "./homeProfileListHeader";
import HomeProfileListShowcase from "./homeProfileListShowcase";
import LoadMoreProfilesButton from "../button/loadMoreProfilesButton";

interface HomeProfileListProps {
  myProfileId: MyProfileIdType;
  profileShowcase: ProfileShowcaseType;
}

const HomeProfileList = ({
  myProfileId,
  profileShowcase
}: HomeProfileListProps) => {
  return (
    <section className="mx-auto my-16 flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col gap-6">
        <HomeProfileListHeader />
        <HomeProfileListShowcase
          myProfileId={myProfileId}
          profileShowcase={profileShowcase}
        />
      </div>
      <LoadMoreProfilesButton />
    </section>
  );
};

export default HomeProfileList;
