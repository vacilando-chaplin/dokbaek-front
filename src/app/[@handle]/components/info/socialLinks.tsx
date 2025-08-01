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

  return (
    (instagramLink || youtubeLink) && (
      <ProfileInfoFrame title="SNS">
        <div className="flex flex-row gap-2">
          {instagramLink && (
            <Link
              href={instagramLink}
              className="flex w-fit items-center gap-1 rounded-[100px] bg-gray-150 p-[5px]"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
          )}
          {youtubeLink && (
            <Link
              href={youtubeLink}
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
