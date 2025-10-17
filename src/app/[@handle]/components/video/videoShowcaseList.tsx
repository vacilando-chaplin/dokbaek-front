"use client";

import YoutubeVideo from "@/components/atoms/youtubeVideo";
import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";
import ProfileShowcaseEmptyFrame from "../container/profileShowcaseEmptyFrame";
import { ProfileVideoDataType } from "../../edit/types";

const VideoShowcaseList = () => {
  const profileData = useRecoilValue(profileViewState);

  const videoList = profileData?.videos || [];

  return videoList.length >= 1 ? (
    <div className="grid h-auto w-full grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] [@media(min-width:1140px)]:grid-cols-3 gap-2">
      {videoList.map((video: ProfileVideoDataType) => {
        return <YoutubeVideo key={video.id} link={video.url} />;
      })}
    </div>
  ) : (
    <ProfileShowcaseEmptyFrame text="영상이 없어요." type="video" />
  );
};

export default VideoShowcaseList;
