"use client";

import LinkModal from "@/components/organisms/linkModal";
import {
  completionProgress,
  isDraftComplete,
  profileIdInit,
  toastMessage
} from "@/lib/atoms";
import { VideoResponseType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import VideoMain from "./components/videoMain";
import VideoModal from "./components/videoModal";
import { VideoLinkType } from "../types";
import { VideoModalType } from "./types";
import { videoModalInit } from "./data";
import { videoLinkInit } from "../../data";
import { deleteVideo, postVideo, putVideo } from "./api";
import { isValid } from "@/lib/utils";
import { getProfileDraftClient } from "../../api";
import Cookies from "js-cookie";

const Video = () => {
  const profileId = Number(Cookies.get("loginProfileId"));
  const isDraftLoading = useRecoilValue(isDraftComplete);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [completion, setCompletion] = useRecoilState(completionProgress);

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
    await postVideo(profileId, videoInputs);

    const res = await getProfileDraftClient(profileId);
    const data = await res.data;

    setCompletion({ ...completion, video: true });
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
    await putVideo(profileId, videoModal.id, videoInputs);

    const res = await getProfileDraftClient(profileId);
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
    await deleteVideo(profileId, videoModal.id);

    const res = await getProfileDraftClient(profileId);
    const data = await res.data;

    isValid(data.videos)
      ? setCompletion({ ...completion, video: true })
      : setCompletion({ ...completion, video: false });
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
      if (isDraftLoading) {
        const res = await getProfileDraftClient(profileId);
        const data = await res.data;

        isValid(data.videos)
          ? setCompletion({ ...completion, video: true })
          : setCompletion({ ...completion, video: false });
        setVideoList(data.videos);
      }
    };
    getProfileData();
  }, [isDraftLoading]);

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
