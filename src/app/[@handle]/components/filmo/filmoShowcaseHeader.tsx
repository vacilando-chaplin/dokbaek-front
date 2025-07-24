import Title from "@/components/atoms/title";
import FilmoViewAllButton from "./filmoViewAllButton";

const FilmoShowcaseHeader = () => {
  return (
    <div className="flex h-auto w-full flex-row items-center justify-between">
      <Title name="작품 활동" />
      <FilmoViewAllButton />
    </div>
  );
};

export default FilmoShowcaseHeader;
