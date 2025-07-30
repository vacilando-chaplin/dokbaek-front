import FilmoShowcaseHeader from "./filmoShowcaseHeader";
import FilmoShowcaseList from "./filmoShowcaseList";

const FilmoShowcase = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-3">
      <FilmoShowcaseHeader />
      <FilmoShowcaseList />
    </section>
  );
};

export default FilmoShowcase;
