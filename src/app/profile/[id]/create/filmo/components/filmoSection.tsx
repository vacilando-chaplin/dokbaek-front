import FilmoSectionHeader from "./filmoSectionHeader";
import FilmoListSection from "./filmoListSection";
import FilmoEmptyFrame from "./filmoEmptyFrame";

const FilmoSection = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <FilmoSectionHeader />
      <FilmoListSection />
      <FilmoEmptyFrame />
    </section>
  );
};

export default FilmoSection;
