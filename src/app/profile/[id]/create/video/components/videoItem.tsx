"use client";

import { ProfileVideoDataType } from "../../types";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  videoInputState,
  videoLinkState,
  videoModalState
} from "@/lib/recoil/profile/video/atom";
import { useState } from "react";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import VideoDeleteModal from "./videoDeleteModal";

interface VideoItemProps {
  video: ProfileVideoDataType;
  thumbnail: string;
}

const VideoItem = ({ video, thumbnail }: VideoItemProps) => {
  const [videoModal, setVideoModal] = useRecoilState(videoModalState);

  const setVideoInputs = useSetRecoilState(videoInputState);
  const setVideoLink = useSetRecoilState(videoLinkState);

  const [videoDeleteModalActive, setVideoDeleteModalActive] = useState(false);

  // 비디오 편집 모달 오픈
  const onVideoEditModalOpen = (video: ProfileVideoDataType) => {
    setVideoInputs(video.url);
    setVideoModal({
      id: video.id,
      state: "edit",
      active: true,
      name: "영상 수정",
      buttonText: "완료"
    });
  };

  // 비디오 삭제 모달 오픈
  const onVideoDeleteModalOpen = (video: ProfileVideoDataType) => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setVideoModal({ ...videoModal, id: video.id, active: false });
  };

  // 비디오 링크 모달 오픈
  const onVideoLinkModalOpen = (url: string) => {
    setVideoLink({ url: url, active: true });
  };

  return (
    <div
      key={video.id}
      className="pointer-events-auto relative w-full animate-enter cursor-pointer rounded-2xl bg-cover bg-center pb-[56.25%]"
      style={{
        backgroundImage: `url(${thumbnail})`
      }}
      onClick={() => onVideoLinkModalOpen(video.url)}
    >
      <div className="pointer-events-auto absolute z-10 h-full w-full opacity-0 hover:opacity-100">
        {/* edit */}
        <button
          className="absolute right-8 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onVideoEditModalOpen(video);
          }}
        >
          <Edit
            width="12"
            height="12"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
        </button>
        {/* delete */}
        <button
          className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onVideoDeleteModalOpen(video);
          }}
        >
          <X
            width="12"
            height="12"
            className="fill-current text-state-negative-light dark:text-state-negative-dark"
          />
        </button>
        {/* deleteModal */}
        <VideoDeleteModal
          videoId={video.id}
          videoDeleteModalActive={videoDeleteModalActive}
          setVideoDeleteModalActive={setVideoDeleteModalActive}
        />
      </div>
    </div>
  );
};

export default VideoItem;
