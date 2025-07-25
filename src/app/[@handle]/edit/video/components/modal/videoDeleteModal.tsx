"use client";

import DeleteModal from "@/components/molecules/deleteModal";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { toastMessage } from "@/lib/atoms";
import Cookies from "js-cookie";
import { deleteVideo } from "../../api";

interface VideoDeleteModalProps {
  videoId: number;
  videoDeleteModalActive: boolean;
  setVideoDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoDeleteModal = ({
  videoId,
  videoDeleteModalActive,
  setVideoDeleteModalActive
}: VideoDeleteModalProps) => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const setProfileData = useSetRecoilState(profileDraftData);
  const setToastMessage = useSetRecoilState(toastMessage);

  // 비디오 삭제 모달 닫기
  const onVideoDeleteModalClose = () => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
  };

  // 비디오 삭제 Mutation
  const useDeleteVideoMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        videoId
      }: {
        profileId: number;
        videoId: number;
      }) => {
        await deleteVideo(profileId, videoId);
        return videoId;
      },
      onSuccess: (videoId) => {
        setProfileData((prev) => ({
          ...prev,
          videos: prev.videos.filter((video) => video.id !== videoId)
        }));
        setToastMessage("영상을 삭제했어요.");
        setVideoDeleteModalActive(false);
      },
      onError: () => {
        setToastMessage("영상 삭제에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  const deleteVideoMutation = useDeleteVideoMutation();

  // 비디오 삭제
  const onVideoDeleteClick = () => {
    deleteVideoMutation.mutate({
      profileId,
      videoId: videoId
    });
  };
  return (
    <>
      {videoDeleteModalActive && (
        <DeleteModal
          text="이 영상을 삭제할까요?"
          id={String(videoId)}
          category=""
          onCancel={onVideoDeleteModalClose}
          onDelete={onVideoDeleteClick}
        />
      )}
    </>
  );
};

export default VideoDeleteModal;
