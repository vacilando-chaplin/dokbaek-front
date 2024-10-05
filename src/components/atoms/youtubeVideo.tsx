import YouTube, { YouTubeProps } from "react-youtube";

interface YoutubeVideoProps {
  link?: string;
  state: string;
}

const YoutubeVideo = ({ link, state }: YoutubeVideoProps) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  return (
    <YouTube
      videoId={link}
      onReady={onPlayerReady}
      iframeClassName="iframe-border iframe-video"
      className={`iframe-wrap ${state === "list" && "iframe-list"} ${state === "modal" && "iframe-modal"}`}
    />
  );
};

export default YoutubeVideo;
