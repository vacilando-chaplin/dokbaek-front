import { filmoActivesTypes, filmoInputsTypes } from "@/types/types";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";
import FilmographySub from "./filmographySub";

interface FilmographyEditModalProps {
  filmoInputs: filmoInputsTypes;
  filmoActives: filmoActivesTypes;
  onFilmoEditModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoProductionChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoDropdownActive: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
  onSelectThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilmographyEditSave: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmographyEditModal = ({
  filmoInputs,
  filmoActives,
  onFilmoEditModalActive,
  onFilmoInputChange,
  onFilmoProductionChange,
  onFilmoDropdownActive,
  onFilmoDropdownClick,
  onSelectThumbnail,
  onFilmographyEditSave
}: FilmographyEditModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative max-h-full w-full max-w-[720px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="작품 활동 수정" onClick={onFilmoEditModalActive} />
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
            text="저장"
            // disabled={
            //   filmoInputs.classification.length === 0 ||
            //   filmoInputs.title.length === 0
            // }
            onCloseClick={onFilmoEditModalActive}
            onSaveClick={onFilmographyEditSave}
          />
        </div>
      </div>
    </section>
  );
};

export default FilmographyEditModal;
