import LikesEmptyFrame from "./likesEmptyFrame";
import LikesShowcaseHeader from "./likesShowcaseHeader";
import { LikedProfileShowcaseType } from "../../types";
import LikesShowcase from "./likesShowcase";

interface LikeProfilesProps {
  likedProfiles: LikedProfileShowcaseType;
}

const LikeProfiles = ({ likedProfiles }: LikeProfilesProps) => {
  return (
    <section className="mt-12 grid w-full max-w-[1272px] gap-6">
      <LikesShowcaseHeader />
      {likedProfiles.profiles.length > 0 ? (
        <LikesShowcase likedProfiles={likedProfiles} />
      ) : (
        <LikesEmptyFrame />
      )}
    </section>
  );
};

export default LikeProfiles;
