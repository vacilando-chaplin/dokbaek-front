import Title from "@/components/atoms/title";
import FilmoItem from "@/components/molecules/filmoItem";
import ModalHeader from "@/components/molecules/modalHeader";
import { FilmoResponseType } from "@/lib/types";

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
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40">
      <div className="interaction-default relative my-20 flex h-auto w-full max-w-[1024px] animate-enter flex-col items-center justify-center rounded-3xl bg-static-white shadow-medium">
        <ModalHeader name="작품 활동" onClick={onFilmoModalActive} />
        <div className="scrollbar flex h-full w-full flex-col overflow-auto overscroll-contain rounded-3xl">
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
    </section>
  );
};

export default ProfileFilmoModal;
