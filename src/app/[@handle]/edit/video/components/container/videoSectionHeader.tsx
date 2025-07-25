"use client";

import BoxButton from "@/components/atoms/boxButton";
import Title from "@/components/atoms/title";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { useRecoilState } from "recoil";
import { videoModalState } from "@/lib/recoil/handle/edit/video/atom";

const VideoSectionHeader = () => {
  const [videoModal, setVideoModal] = useRecoilState(videoModalState);

  // 비디오 모달 오픈
  const onVideoModalOpen = () => {
    setVideoModal({
      ...videoModal,
      state: "add",
      active: true,
      name: "영상 추가",
      buttonText: "추가"
    });
  };

  return (
    <div className="flex w-full flex-row justify-between">
      <Title name="영상" />
      <BoxButton type="primaryOutlined" size="small" onClick={onVideoModalOpen}>
        <Plus
          width="12"
          height="12"
          className="fill-current text-accent-primary-light dark:text-accent-primary-dark"
        />
        추가
      </BoxButton>
    </div>
  );
};

export default VideoSectionHeader;
