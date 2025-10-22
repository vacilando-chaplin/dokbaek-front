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
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{11})/;
    const match = videoInputs.match(regex);

    if (match && match[1]) {
      addVideoMutation.mutate({
        profileId,
        videoInput: match[0]
      });
    } else {
      setToastMessage("잘못된 유튜브 링크에요. 다시 입력해주세요.");
    }
  };

  // 비디오 편집 모달 편집 완료
  const onVideoModalEdit = () => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{11})/;
    const match = videoInputs.match(regex);

    if (match && match[1]) {
      editVideoMutation.mutate({
        profileId,
        videoId: videoModal.id,
        videoInput: match[0]
      });
    } else {
      setToastMessage("잘못된 유튜브 링크에요. 다시 입력해주세요.");
    }
  };

  const isButtonDisabled = () => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{11})/;
    const share_regex = /^https?:\/\/(www\.)?youtu\.be\/([\w-]{11})(\?.*)?$/;
    const match = videoInputs.match(regex);

    if ((match && match[1]) || share_regex.test(videoInputs)) {
      return false;
    } else {
      return true;
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
            disabled={isButtonDisabled()}
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
