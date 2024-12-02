import ImageCropper from "../molecules/imageCropper";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";
import { useRecoilValue } from "recoil";
import { photoDragEnd } from "@/data/atom";

interface PhotoModalProps {
  selectImage: string;
  onModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onAddPhoto: React.MouseEventHandler<HTMLButtonElement>;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
}

const PhotoModal = ({
  selectImage,
  onModalActive,
  onAddPhoto,
  setCropImage
}: PhotoModalProps) => {
  const dragEnd = useRecoilValue(photoDragEnd);

  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative flex h-auto w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
        <ModalTop name="사진 추가" onClick={onModalActive} />
        <div className="flex h-[70vh] max-h-[70vh] w-full flex-row flex-wrap items-center justify-center">
          <ImageCropper selectImage={selectImage} setCropImage={setCropImage} />
        </div>
        <ModalBottom
          text="추가"
          disabled={selectImage.length === 0 || !dragEnd}
          onCloseClick={onModalActive}
          onSaveClick={onAddPhoto}
        />
      </div>
    </section>
  );
};

export default PhotoModal;
