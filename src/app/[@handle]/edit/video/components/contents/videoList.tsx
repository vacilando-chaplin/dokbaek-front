"use client";

import { useRecoilValue } from "recoil";
import EmptyFrame from "@/components/atoms/emptyFrame";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { ProfileVideoDataType } from "../../../types";
import VideoItem from "./videoItem";
import { getVideoId } from "@/lib/utils";

const VideoList = () => {
  const profileData = useRecoilValue(profileDraftData);

  const videoList = profileData?.videos ?? [];

  return (
    <div className="flex h-auto w-full flex-wrap gap-2">
      {videoList.length >= 1 ? (
        <div className="grid h-auto w-full grid-cols-3 gap-2">
          {videoList.map((video: ProfileVideoDataType) => {
            const videoId = getVideoId(video.url);
            const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <VideoItem key={video.id} video={video} thumbnail={thumbnail} />
            );
          })}
        </div>
      ) : (
        <EmptyFrame text="영상을 추가해주세요." />
      )}
    </div>
  );
};

export default VideoList;
