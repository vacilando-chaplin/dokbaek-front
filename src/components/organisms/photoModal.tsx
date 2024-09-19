import { PercentCrop } from "react-image-crop";
import ImageCropper from "../molecules/imageCropper";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";

interface PhotoModalProps {
  selectImage: string;
  imgRef: any;
  previewCanvasRef: any;
  crop: PercentCrop | undefined;
  setCrop: React.Dispatch<React.SetStateAction<PercentCrop | undefined>>;
  onModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onAddPhoto: () => void;
}

const PhotoModal = ({
  selectImage,
  imgRef,
  previewCanvasRef,
  crop,
  setCrop,
  onModalActive,
  onAddPhoto
}: PhotoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative flex max-h-full w-full max-w-[720px] items-center justify-center">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="사진 추가" onClick={onModalActive} />
          <div className="flex w-full flex-row flex-wrap items-center justify-center">
            <ImageCropper
              selectImage={selectImage}
              imgRef={imgRef}
              previewCanvasRef={previewCanvasRef}
              crop={crop}
              setCrop={setCrop}
            />
          </div>
          <ModalBottom
            saveButtonText="저장"
            disabled={selectImage.length === 0}
            onCloseClick={onModalActive}
            onSaveClick={onAddPhoto}
          />
        </div>
      </div>
    </section>
  );
};

export default PhotoModal;
