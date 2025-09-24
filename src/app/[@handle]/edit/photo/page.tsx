import { Metadata } from "next";
import PhotoRecent from "./components/container/photoRecent";
import PhotoUploadSection from "./components/container/photoUploadSection";

export const metadata: Metadata = {
  title: "독백 | 사진 편집",
  description: "내 프로필 사진 편집",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Photo = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <PhotoUploadSection category="photos" />
      <PhotoUploadSection category="stillCuts" />
      <PhotoRecent category="recentPhotos" />
    </div>
  );
};

export default Photo;
