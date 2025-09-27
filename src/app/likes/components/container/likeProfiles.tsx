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
      <LikesShowcase likedProfiles={likedProfiles} />
    </section>
  );
};

export default LikeProfiles;
