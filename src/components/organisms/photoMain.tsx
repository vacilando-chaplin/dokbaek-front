import Image from "next/image";
import EmptyBox from "../atoms/emptyBox";
import Title from "../atoms/title";
import DeleteModal from "../molecules/deleteModal";
import { PhotoResponseType } from "@/types/types";
import Plus from "../../../public/icons/Plus.svg";
import Check from "../../../public/icons/Check.svg";
import Edit from "../../../public/icons/Edit.svg";
import X from "../../../public/icons/X.svg";

interface PhotoMainProps {
  photoList: PhotoResponseType[];
  photoDeleteActive: boolean;
  photoRepActive: boolean;
  repPhoto: PhotoResponseType;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoModalOpen: React.MouseEventHandler<HTMLInputElement>;
  onPhotoEditModalOpen: (photo: any) => void;
  onDeletePhoto: (id: string) => void;
  onDeletePhotoActive: React.MouseEventHandler<HTMLButtonElement>;
  onPhotoRepActive: React.MouseEventHandler<HTMLButtonElement>;
  onPhotoRepSave: React.MouseEventHandler<HTMLButtonElement>;
  onPhotoRepCheck: (photo: PhotoResponseType) => void;
  onPhotoRepClose: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotoMain = ({
  photoList,
  photoDeleteActive,
  photoRepActive,
  repPhoto,
  onSelectFile,
  onPhotoModalOpen,
  onPhotoEditModalOpen,
  onDeletePhoto,
  onDeletePhotoActive,
  onPhotoRepActive,
  onPhotoRepSave,
  onPhotoRepCheck,
  onPhotoRepClose
}: PhotoMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex w-full flex-row justify-between">
        <Title name="사진" />
        <div className="flex items-center gap-1">
          <label className="typography-body3 flex h-auto w-auto cursor-pointer flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] font-medium text-accent-primary-light hover:bg-hover-primaryOutlined active:bg-pressed-primaryOutlined">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onClick={onPhotoModalOpen}
              onChange={onSelectFile}
            />
            <Plus width="12" height="12" fill="#1E85EF" />
            추가
          </label>
        </div>
      </div>
      {photoList.length >= 1 ? (
        <div className="grid w-full grid-cols-4 gap-2">
          {photoList.map((photoItem: PhotoResponseType) => {
            return (
              <figure
                key={photoItem.id}
                className="relative flex aspect-[300/383] h-full w-full rounded-lg"
              >
                <Image
                  src={photoItem.previewPath}
                  alt="사진 미리보기"
                  sizes="(max-width: 768px) 100vw"
                  fill
                  priority
                  className="rounded-lg"
                />
                {photoRepActive === false && photoItem.isDefault && (
                  <label className="typography-caption2 absolute left-2 top-2 flex h-auto w-auto items-center justify-center rounded-full border border-border-default_inverse-light bg-accent-primary-light px-1.5 py-0.5 font-semibold text-content-on_color-light">
                    대표
                  </label>
                )}
                {photoRepActive && (
                  <div className="absolute h-1/4 w-full rounded-lg bg-gradient-to-b from-static-black opacity-50" />
                )}
                {photoRepActive ? (
                  <div className="absolute left-2 top-2 h-full w-full">
                    <div className="flex gap-2">
                      <input
                        className="absolute h-[18px] w-[18px] appearance-none rounded-md focus:outline-none"
                        type="checkbox"
                        onClick={() => onPhotoRepCheck(photoItem)}
                      />
                      <div
                        className={`interaction-default flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded ${repPhoto.id === photoItem.id ? "bg-accent-primary-light" : "border-[1.5px] border-border-default-light"}`}
                      >
                        <Check
                          width="14"
                          height="14"
                          fill={
                            repPhoto.id === photoItem.id ? "#ffffff" : "none"
                          }
                        />
                      </div>
                      <label
                        htmlFor="custom-checkbox"
                        className="typography-body2 select-none font-regular"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="absolute h-full w-full opacity-0 hover:opacity-100">
                    {/* edit */}
                    <label
                      className="absolute right-8 top-2 h-auto w-auto cursor-pointer rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
                      onClick={() => onPhotoEditModalOpen(photoItem)}
                    >
                      <Edit width="12" height="12" fill="#212529" />
                    </label>
                    {/* delete */}
                    <button
                      className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
                      type="button"
                      onClick={onDeletePhotoActive}
                    >
                      <X width="12" height="12" fill="#FB3E34" />
                    </button>
                    {/* deleteModal */}
                    {photoDeleteActive && (
                      <DeleteModal
                        text="이 사진을 삭제할까요?"
                        id={photoItem.id}
                        onCancel={onDeletePhotoActive}
                        onDelete={onDeletePhoto}
                      />
                    )}
                  </div>
                )}
              </figure>
            );
          })}
        </div>
      ) : (
        <EmptyBox text="사진을 추가해주세요." />
      )}
    </section>
  );
};

export default PhotoMain;
