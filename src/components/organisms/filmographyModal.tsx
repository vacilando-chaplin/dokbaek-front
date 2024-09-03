import { filmoActivesTypes, filmoInputsTypes } from "@/types/types";
import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";
import FilmographySub from "./filmographySub";

interface FilmographyModalProps {
  filmoInputs: filmoInputsTypes;
  filmoActives: filmoActivesTypes;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoActiveClick: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
}

const FilmographyModal = ({
  filmoInputs,
  filmoActives,
  onFilmoModalActive,
  onFilmoInputChange,
  onFilmoActiveClick,
  onFilmoDropdownClick
}: FilmographyModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative max-h-full w-full max-w-[720px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="작품 활동 추가" onClick={onFilmoModalActive} />
          <FilmographySub
            filmoInputs={filmoInputs}
            filmoActives={filmoActives}
            onFilmoInputChange={onFilmoInputChange}
            onFilmoActiveClick={onFilmoActiveClick}
            onFilmoDropdownClick={onFilmoDropdownClick}
          />
          <ModalBottom onCloseClick={onFilmoModalActive} />
        </div>
      </div>
    </section>
  );
};

export default FilmographyModal;
