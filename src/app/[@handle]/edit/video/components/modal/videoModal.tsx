"use client";

import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import VideoModalContents from "./videoModalContents";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  videoInputState,
  videoModalState
} from "@/lib/recoil/handle/edit/video/atom";
import { videoModalInit } from "../../data";
import { postVideo, putVideo } from "../../api";
import Cookies from "js-cookie";
import { toastMessage } from "@/lib/atoms";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { useMutation } from "@tanstack/react-query";

const VideoModal = () => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const [videoInputs, setVideoInputs] = useRecoilState(videoInputState);
  const [videoModal, setVideoModal] = useRecoilState(videoModalState);

  const setProfileData = useSetRecoilState(profileDraftData);
  const setToastMessage = useSetRecoilState(toastMessage);

  const disabled =
    videoInputs.includes("https://www.youtube.com") ||
    videoInputs.includes("https://youtu.be");

  // 비디오 링크 입력
  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

  // 비디오 모달 닫기
  const onVideoModalClose = () => {
    setVideoInputs("");
    setVideoModal(videoModalInit);
  };

  // 비디오 저장 Mutation
  const useAddVideoMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        videoInput
      }: {
        profileId: number;
        videoInput: string;
      }) => {
        const res = await postVideo(profileId, videoInput);
        const newVideo = res.data;
        return newVideo;
      },
      onSuccess: (newVideo) => {
        setProfileData((prev) => ({
          ...prev,
          videos: [...(prev.videos ?? []), newVideo]
        }));
        setVideoModal(videoModalInit);
        setVideoInputs("");
        setToastMessage("영상을 추가했어요.");
      },
      onError: () => {
        setToastMessage("영상 추가에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  // 비디오 편집 Mutation
  const useEditVideoMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        videoId,
        videoInput
      }: {
        profileId: number;
        videoId: number;
        videoInput: string;
      }) => {
        const res = await putVideo(profileId, videoId, videoInput);
        const updatedVideo = res.data;
        return updatedVideo;
      },
      onSuccess: (updatedVideo) => {
        setProfileData((prev) => ({
          ...prev,
          videos: prev.videos.map((video) =>
            video.id === updatedVideo.id ? updatedVideo : video
          )
        }));
        setVideoInputs("");
        setVideoModal(videoModalInit);
        setToastMessage("영상을 수정했어요.");
      },
      onError: () => {
        setToastMessage("영상 수정에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  const addVideoMutation = useAddVideoMutation();
  const editVideoMutation = useEditVideoMutation();

  // 비디오 모달 저장 버튼 클릭
  const onVideoModalSave = () => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{11})/;
    const match = videoInputs.match(regex);
    // 정상적인 youtube id면 뒤에 다른 텍스트가 붙어도 정상 작동
    // ex) https://www.youtube.com/watch?v=pDvBiB1waBk&list=RDpDvBiB1waBk&start_radio=1&rv=pDvBiB1waBk
    // 같이 재생목로으로 가져와도 해당 영상만 저장
    if (match && match[1]) {
      addVideoMutation.mutate({
        profileId,
        videoInput: match[0]
      });
    } else {
      // 추가 수정 필요 (토스트 팝업 or 클릭 이전에 버튼 비활성화)
      console.log('잘못된 유튜브 링크');
    }
  };

  // 비디오 편집 모달 편집 완료
  const onVideoModalEdit = () => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{11})/;
    const match = videoInputs.match(regex);

    console.log(videoInputs);
    if (match && match[1]) {
      editVideoMutation.mutate({
        profileId,
        videoId: videoModal.id,
        videoInput: match[0]
      });
    } else {
      // 추가 수정 필요 (토스트 팝업 or 클릭 이전에 버튼 비활성화)
      console.log('잘못된 유튜브 링크');
    }
  };

  return (
    videoModal.active && (
      <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative flex h-auto w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name={videoModal.name} onClick={onVideoModalClose} />
          <VideoModalContents
            videoInputs={videoInputs}
            onVideoInputChange={onVideoInputChange}
          />
          <ModalFooter
            text={videoModal.buttonText}
            disabled={!disabled}
            onCloseClick={onVideoModalClose}
            onSaveClick={
              videoModal.state === "add" ? onVideoModalSave : onVideoModalEdit
            }
          />
        </div>
      </section>
    )
  );
};

export default VideoModal;
