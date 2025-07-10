import EmptyPhotoFrame from "./emptyPhotoFrame";
import PhotoInfoForm from "./photoInfoForm";
import PhotoPreviewList from "./photoPreviewList";
import PhotoCropModal from "./photoCropModal";
import { CategoryKey } from "../types";

interface PhotoUploadSectionProps {
  category: CategoryKey;
}

const PhotoUploadSection = ({ category }: PhotoUploadSectionProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <PhotoInfoForm category={category} hasLimit hasButton />
      <PhotoPreviewList category={category} />
      <EmptyPhotoFrame category={category} />
      <PhotoCropModal />
    </section>
  );
};

export default PhotoUploadSection;
