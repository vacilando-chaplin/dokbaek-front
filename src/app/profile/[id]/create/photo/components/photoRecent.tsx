import Title from "@/components/atoms/title";
import TitleHelperText from "./titleHelperText";
import RecentPhotoFrame from "./recentPhotoFrame";

interface PhotoRecentProps {}

const PhotoRecent = ({}: PhotoRecentProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex flex-col gap-1">
        <Title name="최근 사진" />
        <TitleHelperText text="최근 3개월 내에 보정 없이 촬영한 사진을 추가해주세요." />
      </div>
      <div className="flex h-auto w-full flex-row gap-2">
        <RecentPhotoFrame text="전신 사진" />
        <RecentPhotoFrame text="얼굴 정면 사진" />
        <RecentPhotoFrame text="얼굴 좌측 사진" />
        <RecentPhotoFrame text="얼굴 우측 사진" />
      </div>
    </section>
  );
};

export default PhotoRecent;
