import VideoInitializer from "./components/videoInitializer";
import VideoSectionHeader from "./components/videoSectionHeader";
import VideoListSection from "./components/videoListSection";
import VideoModal from "./components/videoModal";
import VideoLinkModal from "./components/videoLinkModal";

const Video = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <VideoInitializer>
        <VideoSectionHeader />
        <VideoListSection />
        <VideoModal />
        <VideoLinkModal />
      </VideoInitializer>
    </div>
  );
};

export default Video;
