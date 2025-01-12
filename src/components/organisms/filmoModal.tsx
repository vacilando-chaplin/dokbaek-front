import { FilmoActiveType, FilmoInputType, FilmoModalType } from "@/types/types";
import ModalHeader from "../molecules/modalHeader";
import ModalFooter from "../molecules/modalFooter";
import FilmoModalContents from "./filmoModalContents";

interface FilmoModalProps {
  filmoInputs: FilmoInputType;
  filmoActives: FilmoActiveType;
  filmoModal: FilmoModalType;
  onFilmoModalClose: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoProductionChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoDropdownActive: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
  onSelectThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilmographySave: React.MouseEventHandler<HTMLButtonElement>;
  onFilmographyEdit: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmoModal = ({
  filmoInputs,
  filmoActives,
  filmoModal,
  onFilmoModalClose,
  onFilmoInputChange,
  onFilmoProductionChange,
  onFilmoDropdownActive,
  onFilmoDropdownClick,
  onSelectThumbnail,
  onFilmographySave,
  onFilmographyEdit
}: FilmoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="interaction-default relative my-[80px] flex w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-medium">
        <ModalHeader name={filmoModal.name} onClick={onFilmoModalClose} />
        <FilmoModalContents
          filmoInputs={filmoInputs}
          filmoActives={filmoActives}
          onFilmoInputChange={onFilmoInputChange}
          onFilmoProductionChange={onFilmoProductionChange}
          onFilmoDropdownActive={onFilmoDropdownActive}
          onFilmoDropdownClick={onFilmoDropdownClick}
          onSelectThumbnail={onSelectThumbnail}
        />
        <ModalFooter
          text={filmoModal.buttonText}
          disabled={
            filmoInputs.classification.length === 0 ||
            filmoInputs.title.length === 0
          }
          onCloseClick={onFilmoModalClose}
          onSaveClick={
            filmoModal.state === "add" ? onFilmographySave : onFilmographyEdit
          }
        />
      </div>
    </section>
  );
};

export default FilmoModal;
