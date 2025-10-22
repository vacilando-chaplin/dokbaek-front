import { getVideoId } from "@/lib/utils";
import YouTube from "react-youtube";

interface YoutubeVideoProps {
  link: string;
}

const YoutubeVideo = ({ link }: YoutubeVideoProps) => {
  const videoId = getVideoId(link);

  const opts = {
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  };

  return (
    <YouTube
      videoId={videoId}
      iframeClassName="iframe-border iframe-video"
      className="iframe-wrap iframe-size"
      opts={opts}
    />
  );
};

export default YoutubeVideo;
