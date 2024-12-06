import YouTube from "react-youtube";

interface YoutubeVideoProps {
  link: string;
}

const YoutubeVideo = ({ link }: YoutubeVideoProps) => {
  const opts = {
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  };

  return (
    <YouTube
      videoId={
        link.includes("https://www.youtube.com")
          ? link.slice(32, 43)
          : link.slice(17, 48)
      }
      iframeClassName="iframe-border iframe-video"
      className="iframe-wrap iframe-size"
      opts={opts}
    />
  );
};

export default YoutubeVideo;
