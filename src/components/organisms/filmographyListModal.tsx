import { filmoInputsTypes } from "@/types/types";
import ModalTop from "../molecules/modalTop";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";

interface FilmographyListModalProps {
  filmography: filmoInputsTypes[];
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmographyListModal = ({
  filmography,
  onFilmoModalActive
}: FilmographyListModalProps) => {
  const classificationList = Array.from(
    new Set(
      filmography.map((filmo: filmoInputsTypes) => {
        return filmo.classification;
      })
    )
  );

  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative max-h-[920px] w-full max-w-[1024px] py-20">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-3xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="작품 활동 추가" onClick={onFilmoModalActive} />
          {classificationList.map((classification: string) => {
            const filmo = filmography.filter(
              (filmo: filmoInputsTypes) =>
                filmo.classification === classification
            );
            return (
              <div
                key={classification}
                className="flex h-full w-full flex-col gap-6 rounded-3xl bg-background-surface-light p-6"
              >
                <Title name={classification} />
                <div className="flex h-auto w-full flex-row flex-wrap gap-2">
                  {filmo.map((item: filmoInputsTypes) => {
                    return (
                      <div className="flex h-auto w-[320px] gap-2">
                        <FilmoItem key={item.id} filmo={item} canEdit={false} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FilmographyListModal;
