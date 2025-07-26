import { videoLinkInit } from "@/app/[@handle]/data";
import { VideoLinkType } from "@/app/[@handle]/edit/types";
import { videoModalInit } from "@/app/[@handle]/edit/video/data";
import { VideoModalType } from "@/app/[@handle]/edit/video/types";
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
