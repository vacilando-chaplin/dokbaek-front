import Title from "@/components/atoms/title";
import PhotoSelectChips from "./photoSelectChips";
import PhotoArrowButtons from "./photoArrowButtons";

const PhotoShowcaseHeader = () => {
  return (
    <>
      <Title name="사진" />
      <div className="flex h-auto w-full flex-row items-center justify-between">
        <PhotoSelectChips />
        <PhotoArrowButtons />
      </div>
    </>
  );
};

export default PhotoShowcaseHeader;
