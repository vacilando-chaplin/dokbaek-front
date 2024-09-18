import { filmoActivesTypes, filmoInputsTypes } from "@/types/types";
import ModalTop from "../molecules/modalTop";
import FilmographySub from "./filmographySub";
import ModalBottom from "../molecules/modalBottom";

interface FilmographyEditModalProps {
  filmoInputs: filmoInputsTypes;
  filmoActives: filmoActivesTypes;
  onFilmoEditActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoActiveClick: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
  onSelectThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilmoEditSaveClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmographyEditModal = ({
  filmoInputs,
  filmoActives,
  onFilmoEditActive,
  onFilmoInputChange,
  onFilmoActiveClick,
  onFilmoDropdownClick,
  onSelectThumbnail,
  onFilmoEditSaveClick
}: FilmographyEditModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative max-h-full w-full max-w-[720px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="작품 활동 수정" onClick={onFilmoEditActive} />
          <FilmographySub
            filmoInputs={filmoInputs}
            filmoActives={filmoActives}
            onFilmoInputChange={onFilmoInputChange}
            onFilmoActiveClick={onFilmoActiveClick}
            onFilmoDropdownClick={onFilmoDropdownClick}
            onSelectThumbnail={onSelectThumbnail}
          />
          <ModalBottom
            saveButtonText="저장"
            required={
              filmoInputs.classification.length >= 1 &&
              filmoInputs.title.length >= 1
            }
            onCloseClick={onFilmoEditActive}
            onSaveClick={onFilmoEditSaveClick}
          />
        </div>
      </div>
    </section>
  );
};

export default FilmographyEditModal;
