import FilmoSection from "./components/filmoSection";
import FilmoModal from "./components/filmoModal";
import FilmoDeleteModal from "./components/filmoDeleteModal";
import FilmoLinkModal from "./components/filmoLinkModal";
import FilmoInintializer from "./components/filmoInitializer";

const Filmography = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <FilmoInintializer>
        <FilmoSection />
        <FilmoModal />
        <FilmoDeleteModal />
        <FilmoLinkModal />
      </FilmoInintializer>
    </div>
  );
};

export default Filmography;
