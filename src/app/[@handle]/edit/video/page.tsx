import VideoListSection from "./components/container/videoListSection";
import VideoModal from "./components/modal/videoModal";
import VideoInitializer from "./components/provider/videoInitializer";
import VideoLinkModal from "./components/modal/videoLinkModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "독백 | 영상 편집",
  description: "내 프로필 영상 편집",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Video = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <VideoInitializer>
        <VideoListSection />
        <VideoModal />
        <VideoLinkModal />
      </VideoInitializer>
    </div>
  );
};

export default Video;
