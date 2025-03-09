import ImageCropper from "@/components/molecules/imageCropper";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import { CropDataType, ProfilePhotoModalType } from "../types";

interface ProfileMainPhotoModalProps {
  cropData: CropDataType | {};
  selectImage: string;
  photoModal: ProfilePhotoModalType;
  onModalClose: React.MouseEventHandler<HTMLButtonElement>;
  onAddPhoto: React.MouseEventHandler<HTMLButtonElement>;
  onChangeMainPhoto: () => void;
  onEditPhoto: React.MouseEventHandler<HTMLButtonElement>;
  setCropData: any;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileMainPhotoModal = ({
  cropData,
  selectImage,
  photoModal,
  onModalClose,
  onAddPhoto,
  onChangeMainPhoto,
  onEditPhoto,
  setCropData,
  setCropImage
}: ProfileMainPhotoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="interaction-default relative flex h-auto max-h-[88vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-medium">
        <ModalHeader name={photoModal.name} onClick={onModalClose} />
        <div className="flex h-[70vh] max-h-[70vh] w-full flex-col items-center justify-center">
          <ImageCropper
            cropType="mainPhoto"
            cropData={cropData}
            setCropData={setCropData}
            selectImage={selectImage}
            setCropImage={setCropImage}
          />
        </div>
        <ModalFooter
          text={photoModal.buttonText}
          disabled={selectImage.length === 0}
          onCloseClick={onModalClose}
          onSaveClick={
            photoModal.state === "add"
              ? onAddPhoto
              : photoModal.state === "edit"
                ? onEditPhoto
                : onChangeMainPhoto
          }
        />
      </div>
    </section>
  );
};

export default ProfileMainPhotoModal;
