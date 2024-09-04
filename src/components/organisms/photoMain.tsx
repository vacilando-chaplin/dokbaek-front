import Image from "next/image";
import Title from "../atoms/title";
import PhotoFrame from "../molecules/photoFrame";

interface PhotoMainProps {
  photoList: string[];
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoModalActive: React.MouseEventHandler<HTMLInputElement>;
}

const PhotoMain = ({
  photoList,
  onSelectFile,
  onPhotoModalActive
}: PhotoMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="사진" />
      <div className="flex h-auto w-full flex-wrap gap-2">
        <PhotoFrame
          style="w-[160px] h-[204px]"
          onClick={onPhotoModalActive}
          onChange={onSelectFile}
        />
        {photoList &&
          photoList.map((photo: string, index: number) => {
            return (
              <Image
                src={photo}
                alt={`photo${+index + 1}`}
                width={160}
                height={204}
                priority
                className="h-[204px] w-[160px] rounded-lg bg-gray-100"
              />
            );
          })}
      </div>
    </section>
  );
};

export default PhotoMain;
