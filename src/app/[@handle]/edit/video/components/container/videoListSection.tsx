import VideoList from "../contents/videoList";

const VideoListSection = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <VideoList />
    </section>
  );
};

export default VideoListSection;
