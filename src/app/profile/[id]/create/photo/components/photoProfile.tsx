import Image from "next/image";
import Title from "@/components/atoms/title";
import DeleteModal from "@/components/molecules/deleteModal";
import Plus from "../../../../../../../public/icons/Plus.svg";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import { PhotoResponseType } from "@/lib/types";
import LimitLabel from "./limitLabel";
import TitleHelperText from "./titleHelperText";
import EmptyPhotoFrame from "./emptyPhotoFrame";
import UploadButton from "@/components/atoms/uploadButton";

interface PhotoProfileProps {
  photoList: PhotoResponseType[];
  photoDeleteActive: boolean;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoModalOpen: (category: string) => void;
  onPhotoEditModalOpen: (photo: any, category: string) => void;
  onDeletePhoto: (id: string, category: string) => void;
  onDeletePhotoActive: React.MouseEventHandler<HTMLButtonElement>;
  onDrop: (images: File[], rejectedFiles: any[]) => void;
}

const PhotoProfile = ({
  photoList,
  photoDeleteActive,
  onSelectFile,
  onPhotoModalOpen,
  onPhotoEditModalOpen,
  onDeletePhoto,
  onDeletePhotoActive,
  onDrop
}: PhotoProfileProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <div className="flex w-full flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <Title name="프로필 사진" />
            <LimitLabel value={photoList.length} limit={20} />
          </div>
          <TitleHelperText text="자신의 매력을 가장 잘 보여줄 수 있는 프로필 사진을 추가해주세요." />
        </div>
        <UploadButton
          type="primaryOutlined"
          size="small"
          disabled={photoList.length >= 20}
          onClick={() => onPhotoModalOpen("photo")}
          onChange={onSelectFile}
        >
          <Plus width="12" height="12" fill="#1E85EF" />
          추가
        </UploadButton>
      </div>
      {photoList.length >= 1 ? (
        <div className="grid w-full grid-cols-4 gap-2">
          {photoList.map((photoItem: PhotoResponseType) => {
            return (
              <figure
                key={photoItem.id}
                className="relative flex aspect-[160/204] h-full w-full rounded-lg"
              >
                <Image
                  src={photoItem.previewPath}
                  alt="사진 미리보기"
                  sizes="(max-width: 768px) 100vw"
                  fill
                  priority
                  className="rounded-lg"
                />
                (
                <div className="absolute h-full w-full opacity-0 hover:opacity-100">
                  {/* edit */}
                  <label
                    className="absolute right-8 top-2 h-auto w-auto cursor-pointer rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                    onClick={() => onPhotoEditModalOpen(photoItem, "photo")}
                  >
                    <Edit width="12" height="12" fill="#212529" />
                  </label>
                  {/* delete */}
                  <button
                    className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                    type="button"
                    onClick={onDeletePhotoActive}
                  >
                    <X width="12" height="12" fill="#FB3E34" />
                  </button>
                  {/* deleteModal */}
                  {photoDeleteActive && (
                    <DeleteModal
                      id={photoItem.id}
                      text="이 사진을 삭제할까요?"
                      category="photo"
                      onCancel={onDeletePhotoActive}
                      onDelete={onDeletePhoto}
                    />
                  )}
                </div>
                )
              </figure>
            );
          })}
        </div>
      ) : (
        <EmptyPhotoFrame
          text="추가할 사진을 끌어다 놓으세요."
          listSize={photoList.length}
          onDrop={onDrop}
          onCropModalOpen={() => onPhotoModalOpen("photo")}
          onChange={onSelectFile}
        />
      )}
    </section>
  );
};

export default PhotoProfile;
