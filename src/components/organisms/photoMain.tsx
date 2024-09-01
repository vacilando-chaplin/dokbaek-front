import Title from "../atoms/title";
import PhotoFrame from "../molecules/photoFrame";

interface PhotoMainProps {
  photoList: string[];
  modalOpen: boolean;
  onAddPhoto: any;
  onModalOpen: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotoMain = ({
  photoList,
  modalOpen,
  onAddPhoto,
  onModalOpen
}: PhotoMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="사진" />
      <div className="flex h-auto w-full gap-2">
        <PhotoFrame onClick={onModalOpen} />
      </div>
    </section>
  );
};

export default PhotoMain;
