import YouTube, { YouTubeProps } from "react-youtube";

interface YoutubeVideoProps {
  link: string;
}

const YoutubeVideo = ({ link }: YoutubeVideoProps) => {
  const videoId = link.slice(32, 43);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  return (
    <YouTube
      videoId={videoId}
      onReady={onPlayerReady}
      iframeClassName="iframe-border iframe-video"
      className="iframe-wrap iframe-size"
    />
  );
};

export default YoutubeVideo;
