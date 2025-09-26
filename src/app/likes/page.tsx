import { Metadata } from "next";
import LikeProfiles from "./components/container/likeProfiles";
import { getLikedProfilesServer } from "@/lib/api/likes/api";

export const metadata: Metadata = {
  title: "독백 | 좋아요한 프로필",
  description: "내가 좋아요한 배우 프로필 모음",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Likes = async () => {
  const page = 0;
  const size = 20;
  const res = await getLikedProfilesServer(page, size);

  const initialProfileShowcaseData = {
    profiles: res.content || [],
    currentPage: res.page || 0,
    totalElements: res.totalElements || 0,
    totalPages: res.totalPages || 0,
    hasNext: res.hasNext
  };

  return (
    <div className="container-max m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <LikeProfiles likedProfiles={initialProfileShowcaseData} />
    </div>
  );
};

export default Likes;
