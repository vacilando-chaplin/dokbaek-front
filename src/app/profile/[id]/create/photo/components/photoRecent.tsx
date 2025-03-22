import Title from "@/components/atoms/title";
import TitleHelperText from "./titleHelperText";
import RecentPhotoFrame from "./recentPhotoFrame";
import { PhotoRecentResponseType } from "@/lib/types";
import Image from "next/image";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import DeleteModal from "@/components/molecules/deleteModal";

interface PhotoRecentProps {
  recentPhotoList: PhotoRecentResponseType[];
  photoDeleteActive: boolean;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoModalOpen: (category: string) => void;
  onPhotoEditModalOpen: (photo: any, category: string) => void;
  onDeletePhoto: (id: string, category: string) => void;
  onDeletePhotoActive: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotoRecent = ({
  recentPhotoList,
  photoDeleteActive,
  onSelectFile,
  onPhotoModalOpen,
  onDeletePhoto,
  onDeletePhotoActive,
  onPhotoEditModalOpen
}: PhotoRecentProps) => {
  const recentPhotoData = [
    {
      photoType: "FULL_BODY",
      name: "전신 사진"
    },
    {
      photoType: "FRONT_FACE",
      name: "얼굴 정면 사진"
    },
    {
      photoType: "LEFT_FACE",
      name: "얼굴 좌측 사진"
    },
    { photoType: "RIGHT_FACE", name: "얼굴 우측 사진" }
  ];

  interface recentPhotoDataType {
    photoType: string;
    name: string;
  }
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <div className="flex flex-col gap-1">
        <Title name="최근 사진" />
        <TitleHelperText text="최근 3개월 내에 보정 없이 촬영한 사진을 추가해주세요." />
      </div>
      <div className="grid w-full grid-cols-4 gap-2">
        {recentPhotoData.map(
          (photoData: recentPhotoDataType, index: number) => {
            const recentPhoto = recentPhotoList.find(
              (recentPhoto) => recentPhoto.photoType === photoData.photoType
            );
            return (
              <div className="flex h-auto w-full flex-row gap-2" key={index}>
                {recentPhoto ? (
                  <figure className="relative flex aspect-[160/204] h-full w-full rounded-lg">
                    <Image
                      src={recentPhoto.previewPath}
                      alt="사진 미리보기"
                      sizes="(max-width: 768px) 100vw"
                      fill
                      priority
                      className="rounded-lg"
                    />
                    (
                    <div className="absolute h-full w-full opacity-0 hover:opacity-100">
                      <label
                        className="absolute right-8 top-2 h-auto w-auto cursor-pointer rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                        onClick={() =>
                          onPhotoEditModalOpen(recentPhoto, "recent")
                        }
                      >
                        <Edit
                          width="12"
                          height="12"
                          className="fill-current text-content-primary-light dark:text-content-primary-dark"
                        />
                      </label>
                      <button
                        className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                        type="button"
                        onClick={onDeletePhotoActive}
                      >
                        <X
                          width="12"
                          height="12"
                          className="fill-current text-state-negative-light dark:text-state-negative-dark"
                        />
                      </button>
                      {photoDeleteActive && (
                        <DeleteModal
                          id={recentPhoto.id}
                          text="이 사진을 삭제할까요?"
                          category="recent"
                          onCancel={onDeletePhotoActive}
                          onDelete={onDeletePhoto}
                        />
                      )}
                    </div>
                    )
                  </figure>
                ) : (
                  <RecentPhotoFrame
                    text={photoData.name}
                    onSelectFile={onSelectFile}
                    onPhotoModalOpen={() =>
                      onPhotoModalOpen(photoData.photoType)
                    }
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default PhotoRecent;
