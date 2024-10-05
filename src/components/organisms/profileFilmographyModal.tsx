import { filmoInputsTypes } from "@/types/types";
import ModalTop from "../molecules/modalTop";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";

interface ProfileFilmographyModalProps {
  filmography: filmoInputsTypes[];
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileFilmographyModal = ({
  filmography,
  onFilmoModalActive
}: ProfileFilmographyModalProps) => {
  const classificationList = Array.from(
    new Set(
      filmography.map((filmo: filmoInputsTypes) => {
        return filmo.classification;
      })
    )
  );

  return (
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative w-full max-w-[1024px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-3xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="작품 활동 추가" onClick={onFilmoModalActive} />
          <div className="flex h-full max-h-[74vh] w-full flex-col overflow-auto overscroll-contain rounded-3xl [&::-webkit-scrollbar-button:vertical:end:decrement]:block [&::-webkit-scrollbar-button:vertical:end:decrement]:w-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:bg-[#E7E7ED] [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-track]:bg-static-white [&::-webkit-scrollbar]:w-2.5">
            {classificationList.map((classification: string) => {
              const filmo = filmography.filter(
                (filmo: filmoInputsTypes) =>
                  filmo.classification === classification
              );
              return (
                <div
                  key={classification}
                  className="flex h-full w-full flex-col gap-6 bg-background-surface-light p-6"
                >
                  <Title name={classification} />
                  <div className="flex h-auto w-full flex-row flex-wrap gap-2">
                    {filmo.map((item: filmoInputsTypes) => {
                      return (
                        <div className="flex h-auto w-[320px] gap-2">
                          <FilmoItem
                            key={item.id}
                            filmo={item}
                            canEdit={false}
                            canLink={false}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileFilmographyModal;
