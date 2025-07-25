import VideoSectionHeader from "./components/container/videoSectionHeader";
import VideoListSection from "./components/container/videoListSection";
import VideoModal from "./components/modal/videoModal";
import VideoInitializer from "./components/provider/videoInitializer";
import VideoLinkModal from "./components/modal/videoLinkModal";

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
