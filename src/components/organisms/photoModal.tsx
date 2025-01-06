import { PhotoModalType } from "@/types/types";
import ImageCropper from "../molecules/imageCropper";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";

interface PhotoModalProps {
  selectImage: string;
  photoModal: PhotoModalType;
  onModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onAddPhoto: React.MouseEventHandler<HTMLButtonElement>;
  onEditPhoto: React.MouseEventHandler<HTMLButtonElement>;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
}

const PhotoModal = ({
  selectImage,
  photoModal,
  onModalActive,
  onAddPhoto,
  onEditPhoto,
  setCropImage
}: PhotoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="shadow-medium relative flex h-auto w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white transition-all duration-100 ease-linear">
        <ModalTop name={photoModal.name} onClick={onModalActive} />
        <div className="flex h-[70vh] max-h-[70vh] w-full flex-row flex-wrap items-center justify-center">
          <ImageCropper selectImage={selectImage} setCropImage={setCropImage} />
        </div>
        <ModalBottom
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
