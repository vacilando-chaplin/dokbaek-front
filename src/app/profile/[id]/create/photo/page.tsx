import PhotoUploadSection from "./components/photoUploadSection";

const Photo = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <PhotoUploadSection category="photos" />
      <PhotoUploadSection category="stillCuts" />
      {/* <PhotoRecent
        recentPhotoList={recentPhotoList}
        photoDeleteActive={photoDeleteActive}
        onSelectFile={onSelectFile}
        onPhotoModalOpen={onPhotoModalOpen}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
      /> */}
    </div>
  );
};

export default Photo;
