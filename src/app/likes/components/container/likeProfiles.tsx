import LikesShowcaseHeader from "./likesShowcaseHeader";
import { LikedProfileShowcaseType } from "../../types";
import LikesShowcase from "./likesShowcase";

interface LikeProfilesProps {
  currentPage: number;
  likedProfiles: LikedProfileShowcaseType;
}

const LikeProfiles = ({ currentPage, likedProfiles }: LikeProfilesProps) => {
  return (
    <section className="mt-12 grid w-full max-w-[1272px] gap-6">
      <LikesShowcaseHeader />
      <LikesShowcase currentPage={currentPage} likedProfiles={likedProfiles} />
    </section>
  );
};

export default LikeProfiles;
