import ImageCropper from "@/components/molecules/imageCropper";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import Image from "next/image";
import { PhotoModalType, SelectedImagesType } from "../../../types";

interface PhotoModalProps {
  selectImage: string;
  selectedImages: SelectedImagesType[];
  selectedPhotoId: number;
  photoModal: PhotoModalType;
  onModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onAddPhoto: React.MouseEventHandler<HTMLButtonElement>;
  onEditPhoto: React.MouseEventHandler<HTMLButtonElement>;
  setCropData: any;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
  onSelectImage: (index: number) => void;
}

const PhotoModal = ({
  selectImage,
  selectedImages,
  selectedPhotoId,
  photoModal,
  onModalActive,
  onAddPhoto,
  onEditPhoto,
  setCropData,
  setCropImage,
  onSelectImage
}: PhotoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="interaction-default relative flex h-auto max-h-[88vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-medium">
        <ModalHeader name={photoModal.name} onClick={onModalActive} />
        <div
          className={`flex w-full flex-col items-center justify-center ${selectedImages.length >= 2 ? "h-[60vh] max-h-[60vh]" : "h-[70vh] max-h-[70vh]"}`}
        >
          <ImageCropper
            cropData={
              selectedImages.length >= 1 &&
              selectedImages[selectedPhotoId].cropData
            }
            cropType={photoModal.category}
            selectImage={selectImage}
            setCropData={setCropData}
            setCropImage={setCropImage}
          />
        </div>
        {selectedImages.length >= 2 && (
          <div className="flex flex-row items-center gap-4 p-4">
            {selectedImages.map((images: SelectedImagesType, index: number) => {
              return (
                <div
                  key={index}
                  className="relative h-20 w-14 cursor-pointer"
                  onClick={() => onSelectImage(index)}
                >
                  <Image
                    src={images.originImage}
                    alt={`originImage${index}`}
                    layout="fill"
                    priority
                  />
                </div>
              );
            })}
          </div>
        )}
        <ModalFooter
          text={photoModal.buttonText}
          disabled={selectImage.length === 0}
          onCloseClick={onModalActive}
          onSaveClick={photoModal.state === "add" ? onAddPhoto : onEditPhoto}
        />
      </div>
    </section>
  );
};

export default PhotoModal;
