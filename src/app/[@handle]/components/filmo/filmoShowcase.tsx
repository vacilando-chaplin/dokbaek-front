import FilmoShowcaseHeader from "./filmoShowcaseHeader";
import FilmoShowcaseList from "./filmoShowcaseList";

const FilmoShowcase = () => {
  return (
    <section className="flex h-auto w-full flex-col">
      <FilmoShowcaseHeader />
      <FilmoShowcaseList />
    </section>
  );
};

export default FilmoShowcase;
