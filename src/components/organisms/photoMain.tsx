import Title from "../atoms/title";
import PhotoFrame from "../molecules/photoFrame";

const PhotoMain = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="사진" />
      <div className="flex h-auto w-full gap-2">
        <PhotoFrame />
      </div>
    </section>
  );
};

export default PhotoMain;
