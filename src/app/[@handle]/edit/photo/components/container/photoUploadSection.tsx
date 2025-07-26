import EmptyPhotoFrame from "../frame/emptyPhotoFrame";
import PhotoCropModal from "../modal/photoCropModal";
import { CategoryKey } from "../../types";
import PhotoInfoForm from "../form/photoInfoForm";
import PhotoPreviewList from "../contents/photoPreviewList";

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
