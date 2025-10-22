"use client";

import { useRecoilValue } from "recoil";
import ProfileInfoFrame from "../container/profileInfoFrame";
import { profileViewState } from "@/lib/recoil/handle/atom";
import Link from "next/link";
import InstagramIcon from "../../../../../public/icons/InstagramIcon.svg";
import YoutubeIcon from "../../../../../public/icons/YoutubeIcon.svg";

const SocialLinks = () => {
  const profileData = useRecoilValue(profileViewState);

  const { instagramLink, youtubeLink } = profileData.info ?? {};

  const getFullUrl = (url: string, platform: "instagram" | "youtube") => {
    if (!url) return "";

    // 이미 완전한 URL인지 확인
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // @ 또는 채널명만 있는 경우 전체 URL 생성
    const channelName = url.replace(/^@/, "");

    if (platform === "instagram") {
      return `https://instagram.com/${channelName}`;
    } else if (platform === "youtube") {
      return `https://youtube.com/@${channelName}`;
    }

    return url;
  };

  const instagramFullUrl = getFullUrl(instagramLink || "", "instagram");
  const youtubeFullUrl = getFullUrl(youtubeLink || "", "youtube");

  return (
    (instagramLink || youtubeLink) && (
      <ProfileInfoFrame title="SNS">
        <div className="flex flex-row gap-2">
          {instagramLink && (
            <Link
              href={instagramFullUrl}
              className="flex w-fit items-center gap-1 rounded-[100px] bg-gray-150 p-[5px]"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
          )}
          {youtubeLink && (
            <Link
              href={youtubeFullUrl}
              className="flex w-fit items-center gap-1 rounded-[100px] bg-gray-150 p-[5px]"
              target="_blank"
            >
              <YoutubeIcon />
            </Link>
          )}
        </div>
      </ProfileInfoFrame>
    )
  );
};

export default SocialLinks;
