import VideoShowcaseHeader from "./videoShowcaseHeader";
import VideoShowcaseList from "./videoShowcaseList";

const VideoShowcase = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-3">
      <VideoShowcaseHeader />
      <VideoShowcaseList />
    </section>
  );
};

export default VideoShowcase;
