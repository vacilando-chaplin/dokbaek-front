"use client";

import LinkModal from "@/components/organisms/linkModal";
import { useRecoilState } from "recoil";
import { videoLinkState } from "@/lib/recoil/handle/edit/video/atom";
import { videoLinkInit } from "@/app/[@handle]/data";

const VideoLinkModal = () => {
  const [videoLink, setVideoLink] = useRecoilState(videoLinkState);

  // 비디오 링크 모달 닫기
  const onVideoLinkModalClose = () => {
    setVideoLink(videoLinkInit);
  };

  return (
    videoLink.active && (
      <LinkModal
        link={videoLink.url}
        onLinkModalClose={onVideoLinkModalClose}
      />
    )
  );
};

export default VideoLinkModal;
