import { FilmoResponseType } from "@/types/types";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";
import ModalTop from "../molecules/modalTop";

interface ProfileFilmographyModalProps {
  filmoList: FilmoResponseType[];
  categoryList: string[];
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoLinkModalOpen: (link: string) => void;
}

const ProfileFilmographyModal = ({
  filmoList,
  categoryList,
  onFilmoModalActive,
  onFilmoLinkModalOpen
}: ProfileFilmographyModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative w-full max-w-[1024px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-3xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="작품 활동" onClick={onFilmoModalActive} />
          <div className="flex h-full max-h-[74vh] w-full flex-col overflow-auto overscroll-contain rounded-3xl [&::-webkit-scrollbar-button:vertical:end:decrement]:block [&::-webkit-scrollbar-button:vertical:end:decrement]:w-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:bg-[#E7E7ED] [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-track]:bg-static-white [&::-webkit-scrollbar]:w-2.5">
            {categoryList.map((category: string) => {
              const filmo = filmoList.filter(
                (filmo: FilmoResponseType) =>
                  filmo.production.category.name === category
              );
              return (
                <div
                  key={category}
                  className="flex h-full w-full flex-col gap-6 bg-background-surface-light p-6"
                >
                  <Title name={category} />
                  <div className="grid h-auto w-full grid-flow-row grid-cols-3 gap-2">
                    {filmo.map((item: FilmoResponseType) => {
                      return (
                        <div className="flex h-auto w-full gap-2">
                          <FilmoItem
                            key={item.id}
                            filmo={item}
                            canEdit={false}
                            onLink={() =>
                              onFilmoLinkModalOpen(item.production.videoUrl)
                            }
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
