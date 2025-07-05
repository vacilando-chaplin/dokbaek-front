import PhotoRecent from "./components/photoRecent";
import PhotoUploadSection from "./components/photoUploadSection";

const Photo = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <PhotoUploadSection category="photos" />
      <PhotoUploadSection category="stillCuts" />
      <PhotoRecent />
    </div>
  );
};

export default Photo;
