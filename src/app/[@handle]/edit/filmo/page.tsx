import FilmoSection from "./components/container/filmoSection";
import FilmoModal from "./components/modal/filmoModal";
import FilmoLinkModal from "./components/modal/filmoLinkModal";
import FilmoInintializer from "./components/provider/filmoInitializer";
import FilmoDeleteModal from "./components/modal/filmoDeleteModal";
import FilmoRepModal from "./components/modal/filmoRepModal";

const Filmography = () => {
  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <FilmoInintializer>
        <FilmoSection />
        <FilmoModal />
        <FilmoDeleteModal />
        <FilmoLinkModal />
        <FilmoRepModal />
      </FilmoInintializer>
    </div>
  );
};

export default Filmography;
