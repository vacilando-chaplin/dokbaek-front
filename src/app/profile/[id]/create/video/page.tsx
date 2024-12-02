"use client";

import { deleteVideo, postVideo, putVideo } from "@/api/api";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import VideoEditModal from "@/components/organisms/videoEditModal";
import VideoMain from "@/components/organisms/videoMain";
import VideoModal from "@/components/organisms/videoModal";
import { defaultId, jwt, toastMessage } from "@/data/atom";
import { videoResponseInit } from "@/data/data";
import { VideoResponseType } from "@/types/types";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Video = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const setToastMessage = useSetRecoilState(toastMessage);

  const [videoList, setVideoList] = useState<VideoResponseType[]>([]);
  const [videoEdit, setVideoEdit] =
    useState<VideoResponseType>(videoResponseInit);
  const [videoInputs, setVideoInputs] = useState("");
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [videoEditModalActive, setVideoEditModalActive] = useState(false);
  const [videoDeleteModalActive, setVideoDeleteModalActive] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [videoLinkModalActive, setVideoLinkModalActive] = useState(false);

  // 비디오 링크 입력
  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

  // 비디오 모달 액티브
  const onVideoModalActive = () => {
    setVideoInputs("");
    setVideoModalActive(!videoModalActive);
  };

  // 비디오 모달 저장 버튼 클릭
  const onVideoModalSave = async () => {
    try {
      const res = await postVideo(userId, videoInputs, token);
      const data = res.data;
      setVideoList([...videoList, data]);
    } catch (error) {
      throw error;
    }

    setVideoModalActive(!videoModalActive);
    setVideoInputs("");
    setToastMessage("영상을 추가했어요.");
  };

  // 비디오 편집 모달 오픈
  const onVideoEditModalOpen = (video: VideoResponseType) => {
    setVideoInputs(video.url);
    setVideoEditModalActive(!videoEditModalActive);
    setVideoEdit(video);
  };

  // 비디오 편집 모달 닫기
  const onVideoEditModalClose = () => {
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setVideoEdit(videoResponseInit);
  };

  // 비디오 편집 모달 편집 완료
  const onVideoEditModalSave = async () => {
    try {
      const data = await putVideo(userId, videoEdit.id, videoInputs, token);

      const index = videoList.findIndex(
        (video: VideoResponseType) => video.id === data.data.id
      );
      const updateList = [...videoList];

      updateList[index].url = data.data.url;
      setVideoList(updateList);
    } catch (error) {
      throw error;
    }
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setToastMessage("영상을 수정했어요.");
  };

  // 비디오 삭제 모달 오픈
  const onVideoDeleteModalOpen = (video: VideoResponseType) => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setVideoEdit(video);
  };

  // 비디오 삭제 모달 닫기
  const onVideoDeleteModalClose = () => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
  };

  // 비디오 삭제 버튼 클릭
  const onVideoDeleteClick = async () => {
    try {
      await deleteVideo(userId, videoEdit.id, token);
      setVideoList((prev: VideoResponseType[]) =>
        prev.filter((video: VideoResponseType) => video.id !== videoEdit.id)
      );
    } catch (error) {
      throw error;
    }
    setVideoEdit(videoResponseInit);
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setToastMessage("영상을 삭제했어요.");
  };

  // 비디오 링크 모달 닫기
  const onVideoLinkModalActive = () => {
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  // 비디오 링크 모달 오픈
  const onVideoLinkModalOpen = (url: string) => {
    setVideoLink(url);
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <VideoMain
        videoList={videoList}
        videoDeleteModalActive={videoDeleteModalActive}
        onVideoModalActive={onVideoModalActive}
        onVideoEditModalOpen={onVideoEditModalOpen}
        onVideoDeleteModalOpen={onVideoDeleteModalOpen}
        onVideoDeleteModalClose={onVideoDeleteModalClose}
        onVideoDeleteClick={onVideoDeleteClick}
        onVideoLinkModalOpen={onVideoLinkModalOpen}
      />
      {videoModalActive && (
        <VideoModal
          videoInputs={videoInputs}
          onVideoInputChange={onVideoInputChange}
          onVideoModalActive={onVideoModalActive}
          onVideoModalSave={onVideoModalSave}
        />
      )}
      {videoEditModalActive && (
        <VideoEditModal
          videoInputs={videoInputs}
          onVideoInputChange={onVideoInputChange}
          onVideoEditModalClose={onVideoEditModalClose}
          onVideoEditModalSave={onVideoEditModalSave}
        />
      )}
      {videoLinkModalActive && (
        <ProfileLinkModal
          filmoLink={videoLink}
          onFilmoLinkModalClose={onVideoLinkModalActive}
        />
      )}
    </div>
  );
};

export default Video;
