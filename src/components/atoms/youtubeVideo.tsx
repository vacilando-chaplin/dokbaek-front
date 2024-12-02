import YouTube from "react-youtube";

interface YoutubeVideoProps {
  link: string;
}

const YoutubeVideo = ({ link }: YoutubeVideoProps) => {
  return (
    <YouTube
      videoId={
        link.includes("https://www.youtube.com")
          ? link.slice(32, 43)
          : link.slice(17, 48)
      }
      iframeClassName="iframe-border iframe-video"
      className="iframe-wrap iframe-size"
    />
  );
};

export default YoutubeVideo;
