"use client";

import { ProfileVideoDataType } from "@/app/profile/[id]/create/types";
import YoutubeVideo from "@/components/atoms/youtubeVideo";
import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";
import ProfileShowcaseEmptyFrame from "../container/profileShowcaseEmptyFrame";

const VideoShowcaseList = () => {
  const profileData = useRecoilValue(profileViewState);

  const videoList = profileData?.videos || [];

  return videoList.length >= 1 ? (
    <div className="grid h-auto w-full grid-cols-3 flex-row gap-2">
      {videoList.map((video: ProfileVideoDataType) => {
        return <YoutubeVideo key={video.id} link={video.url} />;
      })}
    </div>
  ) : (
    <ProfileShowcaseEmptyFrame text="영상이 없어요." />
  );
};

export default VideoShowcaseList;
