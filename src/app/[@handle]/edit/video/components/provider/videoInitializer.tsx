"use client";

import { videoLinkInit } from "@/app/[@handle]/data";
import {
  videoInputState,
  videoLinkState,
  videoModalState
} from "@/lib/recoil/handle/edit/video/atom";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";
import { videoModalInit } from "../../data";

interface VideoInitializerProps {
  children: React.ReactNode;
}

const VideoInitializer = ({ children }: VideoInitializerProps) => {
  const setVideoInputs = useSetRecoilState(videoInputState);
  const setVideoLink = useSetRecoilState(videoLinkState);
  const setVideoModal = useSetRecoilState(videoModalState);

  useLayoutEffect(() => {
    setVideoInputs("");
    setVideoLink(videoLinkInit);
    setVideoModal(videoModalInit);
  }, []);

  return <>{children}</>;
};

export default VideoInitializer;
