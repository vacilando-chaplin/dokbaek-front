import PhotoShowcaseHeader from "./photoShowcaseHeader";
import PhotoShowcaseList from "./photoShowcaseList";

const PhotoShowcase = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-3">
      <PhotoShowcaseHeader />
      <PhotoShowcaseList />
    </section>
  );
};

export default PhotoShowcase;
