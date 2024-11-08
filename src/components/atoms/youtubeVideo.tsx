import YouTube from "react-youtube";

interface YoutubeVideoProps {
  link: string;
}

const YoutubeVideo = ({ link }: YoutubeVideoProps) => {
  const videoId = link.slice(32, 43);

  return (
    <YouTube
      videoId={videoId}
      iframeClassName="iframe-border iframe-video"
      className="iframe-wrap iframe-size"
    />
  );
};

export default YoutubeVideo;
