import { VideoLinkType } from "@/app/profile/[id]/create/types";
import { videoModalInit } from "@/app/profile/[id]/create/video/data";
import { VideoModalType } from "@/app/profile/[id]/create/video/types";
import { videoLinkInit } from "@/app/profile/[id]/data";
import { atom } from "recoil";

export const videoInputState = atom<string>({
  key: "videoInputState",
  default: ""
});

export const videoLinkState = atom<VideoLinkType>({
  key: "videoLinkState",
  default: videoLinkInit
});

export const videoModalState = atom<VideoModalType>({
  key: "videoModalState",
  default: videoModalInit
});
