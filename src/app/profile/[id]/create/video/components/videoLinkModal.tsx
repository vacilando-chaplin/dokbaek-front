"use client";

import LinkModal from "@/components/organisms/linkModal";
import { videoLinkInit } from "../../../data";
import { useRecoilState } from "recoil";
import { videoLinkState } from "@/lib/recoil/profile/video/atom";

const VideoLinkModal = () => {
  const [videoLink, setVideoLink] = useRecoilState(videoLinkState);

  // 비디오 링크 모달 닫기
  const onVideoLinkModalClose = () => {
    setVideoLink(videoLinkInit);
  };

  return (
    <>
      {videoLink.active && (
        <LinkModal
          link={videoLink.url}
          onLinkModalClose={onVideoLinkModalClose}
        />
      )}
    </>
  );
};

export default VideoLinkModal;
