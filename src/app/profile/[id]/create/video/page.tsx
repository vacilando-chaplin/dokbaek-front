"use client";

import { deleteVideo, getProfile, postVideo, putVideo } from "@/app/api/route";
import LinkModal from "@/components/organisms/linkModal";
import VideoMain from "@/components/organisms/videoMain";
import VideoModal from "@/components/organisms/videoModal";
import { defaultId, toastMessage } from "@/data/atom";
import { videoLinkInit, videoModalInit } from "@/data/data";
import {
  VideoLinkType,
  VideoModalType,
  VideoResponseType
} from "@/types/types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Video = () => {
  const userId = useRecoilValue(defaultId);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [videoList, setVideoList] = useState<VideoResponseType[]>([]);
  const [videoInputs, setVideoInputs] = useState("");

  const [videoLink, setVideoLink] = useState<VideoLinkType>(videoLinkInit);
  const [videoModal, setVideoModal] = useState<VideoModalType>(videoModalInit);

  const [videoDeleteModalActive, setVideoDeleteModalActive] = useState(false);

  // 비디오 링크 입력
  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

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

  // 비디오 모달 닫기
  const onVideoModalClose = () => {
    setVideoInputs("");
    setVideoModal(videoModalInit);
  };

  // 비디오 모달 저장 버튼 클릭
  const onVideoModalSave = async () => {
    await postVideo(userId, videoInputs);

    const res = await getProfile(userId);
    const data = await res.data;

    setVideoList(data.videos);
    setVideoModal({ ...videoModal, active: false });
    setVideoInputs("");
    setToastMessage("영상을 추가했어요.");
  };

  // 비디오 편집 모달 오픈
  const onVideoEditModalOpen = (video: VideoResponseType) => {
    setVideoInputs(video.url);
    setVideoModal({
      id: video.id,
      state: "edit",
      active: true,
      name: "영상 수정",
      buttonText: "완료"
    });
  };

  // 비디오 편집 모달 편집 완료
  const onVideoModalEdit = async () => {
    await putVideo(userId, videoModal.id, videoInputs);

    const res = await getProfile(userId);
    const data = await res.data;

    setVideoList(data.videos);
    setVideoInputs("");
    setVideoModal({ ...videoModal, active: false });
    setToastMessage("영상을 수정했어요.");
  };

  // 비디오 삭제 모달 오픈
  const onVideoDeleteModalOpen = (video: VideoResponseType) => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setVideoModal({ ...videoModal, id: video.id, active: false });
  };

  // 비디오 삭제 모달 닫기
  const onVideoDeleteModalClose = () => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
  };

  // 비디오 삭제 버튼 클릭
  const onVideoDeleteClick = async () => {
    await deleteVideo(userId, videoModal.id);

    const res = await getProfile(userId);
    const data = await res.data;

    setVideoList(data.videos);
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setToastMessage("영상을 삭제했어요.");
  };

  // 비디오 링크 모달 오픈
  const onVideoLinkModalOpen = (url: string) => {
    setVideoLink({ url: url, active: true });
  };

  // 비디오 링크 모달 닫기
  const onVideoLinkModalClose = () => {
    setVideoLink({ ...videoLink, active: false });
  };

  // 비디오 리스트 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile(userId);
      const data = await res.data;
      setVideoList(data.videos);
    };
    getProfileData();
  }, []);

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <VideoMain
        videoList={videoList}
        videoDeleteModalActive={videoDeleteModalActive}
        onVideoModalOpen={onVideoModalOpen}
        onVideoEditModalOpen={onVideoEditModalOpen}
        onVideoDeleteModalOpen={onVideoDeleteModalOpen}
        onVideoDeleteModalClose={onVideoDeleteModalClose}
        onVideoDeleteClick={onVideoDeleteClick}
        onVideoLinkModalOpen={onVideoLinkModalOpen}
      />
      {videoModal.active && (
        <VideoModal
          videoInputs={videoInputs}
          videoModal={videoModal}
          onVideoInputChange={onVideoInputChange}
          onVideoModalClose={onVideoModalClose}
          onVideoModalSave={onVideoModalSave}
          onVideoModalEdit={onVideoModalEdit}
        />
      )}
      {videoLink.active && (
        <LinkModal
          link={videoLink.url}
          onLinkModalClose={onVideoLinkModalClose}
        />
      )}
    </div>
  );
};

export default Video;
