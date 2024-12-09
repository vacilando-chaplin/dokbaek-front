import { FilmoActiveType, FilmoInputType, FilmoModalType } from "@/types/types";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";
import FilmographySub from "./filmographySub";

interface FilmographyModalProps {
  filmoInputs: FilmoInputType;
  filmoActives: FilmoActiveType;
  filmoModal: FilmoModalType;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoProductionChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoDropdownActive: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
  onSelectThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilmographySave: React.MouseEventHandler<HTMLButtonElement>;
  onFilmographyEdit: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmographyModal = ({
  filmoInputs,
  filmoActives,
  filmoModal,
  onFilmoModalActive,
  onFilmoInputChange,
  onFilmoProductionChange,
  onFilmoDropdownActive,
  onFilmoDropdownClick,
  onSelectThumbnail,
  onFilmographySave,
  onFilmographyEdit
}: FilmographyModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative flex max-h-[80vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
        <ModalTop name={filmoModal.name} onClick={onFilmoModalActive} />
        <FilmographySub
          filmoInputs={filmoInputs}
          filmoActives={filmoActives}
          onFilmoInputChange={onFilmoInputChange}
          onFilmoProductionChange={onFilmoProductionChange}
          onFilmoDropdownActive={onFilmoDropdownActive}
          onFilmoDropdownClick={onFilmoDropdownClick}
          onSelectThumbnail={onSelectThumbnail}
        />
        <ModalBottom
          text={filmoModal.buttonText}
          disabled={
            filmoInputs.classification.length === 0 ||
            filmoInputs.title.length === 0
          }
          onCloseClick={onFilmoModalActive}
          onSaveClick={
            filmoModal.state === "add" ? onFilmographySave : onFilmographyEdit
          }
        />
      </div>
    </section>
  );
};

export default FilmographyModal;
