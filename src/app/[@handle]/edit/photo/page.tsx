import PhotoRecent from "./components/container/photoRecent";
import PhotoUploadSection from "./components/container/photoUploadSection";

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
