import Title from "@/components/atoms/title";
import ModalHeader from "@/components/molecules/modalHeader";
import { FilmoResponseType } from "@/lib/types";
import FilmoItem from "./profileFilmoItem";

interface ProfileFilmoModalProps {
  filmoList: FilmoResponseType[];
  categoryList: string[];
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoLinkModalOpen: (link: string) => void;
}

const ProfileFilmoModal = ({
  filmoList,
  categoryList,
  onFilmoModalActive,
  onFilmoLinkModalOpen
}: ProfileFilmoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark">
      <div className="interaction-default relative my-20 flex h-auto w-full max-w-[1024px] animate-enter flex-col items-center justify-center rounded-3xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
        <ModalHeader name="작품 활동" onClick={onFilmoModalActive} />
        <div className="scrollbar dark:dark-scrollbar flex h-full max-h-[80vh] w-full flex-col overflow-auto overscroll-contain rounded-3xl">
          {categoryList.map((category: string) => {
            const filmo = filmoList.filter(
              (filmo: FilmoResponseType) =>
                filmo.production.category.name === category
            );
            return (
              <div
                key={category}
                className="flex h-full w-full flex-col gap-6 p-6"
              >
                <Title name={category} />
                <div className="grid h-auto w-full grid-flow-row grid-cols-3 gap-2">
                  {filmo.map((item: FilmoResponseType) => {
                    return (
                      <div className="flex h-auto w-full gap-2" key={item.id}>
                        <FilmoItem
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
    </section>
  );
};

export default ProfileFilmoModal;
