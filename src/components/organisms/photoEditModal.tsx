import ImageCropper from "../molecules/imageCropper";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";

interface PhotoEditModalProps {
  selectImage: string;
  onModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onEditPhoto: React.MouseEventHandler<HTMLButtonElement>;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
}

const PhotoEditModal = ({
  selectImage,
  onModalActive,
  onEditPhoto,
  setCropImage
}: PhotoEditModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative flex max-h-full w-full max-w-[720px] items-center justify-center">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="사진 편집" onClick={onModalActive} />
          <div className="flex h-[70vh] max-h-[70vh] w-full flex-row flex-wrap items-center justify-center">
            <ImageCropper
              selectImage={selectImage}
              setCropImage={setCropImage}
            />
          </div>
          <ModalBottom
            text="완료"
            disabled={selectImage.length === 0}
            onCloseClick={onModalActive}
            onSaveClick={onEditPhoto}
          />
        </div>
      </div>
    </section>
  );
};

export default PhotoEditModal;
