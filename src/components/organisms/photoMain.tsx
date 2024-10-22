import Image from "next/image";
import Title from "../atoms/title";
import RepresentativeButton from "../atoms/representiveButton";
import EmptyBox from "../atoms/emptyBox";

interface PhotoMainProps {
  photoList: string[];
  photoDeleteActive: boolean;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoModalActive: React.MouseEventHandler<HTMLInputElement>;
  onEditPhotoModalActive: (photo: string) => void;
  onDeletePhoto: (photo: string) => void;
  onDeletePhotoActive: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotoMain = ({
  photoList,
  photoDeleteActive,
  onSelectFile,
  onPhotoModalActive,
  onEditPhotoModalActive,
  onDeletePhoto,
  onDeletePhotoActive
}: PhotoMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex w-full flex-row justify-between">
        <Title name="사진" />
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center gap-1">
            {photoList.length >= 1 && (
              <RepresentativeButton icon={true} text="대표 사진 설정" />
            )}
            <label className="flex h-auto w-auto cursor-pointer flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-accent-primary-light">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onClick={onPhotoModalActive}
                onChange={onSelectFile}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z"
                  fill="#1E85EF"
                />
              </svg>
              추가
            </label>
          </div>
        </div>
      </div>
      <div className="flex h-auto w-full flex-wrap gap-2">
        {photoList.length >= 1 ? (
          photoList.map((photo: string, index: number) => {
            return (
              <figure className="relative flex h-[200px] w-[160px] rounded-lg">
                <Image
                  key={`photo ${+index + 1}`}
                  src={photo}
                  alt={photo}
                  width={164}
                  height={204}
                  priority
                  className="rounded-lg"
                />
                <div className="absolute h-full w-full opacity-0 hover:opacity-100">
                  {/* edit */}
                  <label className="absolute right-7 top-1 h-auto w-auto cursor-pointer rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onClick={() => onEditPhotoModalActive(photo)}
                      onChange={onSelectFile}
                    />
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.9142 1.99997C19.1332 1.21892 17.8668 1.21892 17.0858 1.99997L7.78167 11.3041C7.39841 11.6873 7.18712 12.2097 7.19616 12.7517L7.23096 14.8382C7.24895 15.9166 8.11887 16.7866 9.19733 16.8045L11.2838 16.8393C11.8258 16.8484 12.3482 16.6371 12.7314 16.2538L22.0355 6.94972C22.8166 6.16867 22.8166 4.90234 22.0355 4.12129L19.9142 1.99997ZM18.5 3.41418L20.6213 5.5355L11.3172 14.8396L9.23068 14.8048L9.19588 12.7183L18.5 3.41418Z"
                        fill="#212529"
                      />
                      <path
                        d="M4 4.99997C4 4.44769 4.44772 3.99997 5 3.99997H11C11.5523 3.99997 12 3.55226 12 2.99997C12 2.44769 11.5523 1.99997 11 1.99997H5C3.34315 1.99997 2 3.34312 2 4.99997V19C2 20.6568 3.34315 22 5 22H19C20.6569 22 22 20.6568 22 19V13C22 12.4477 21.5523 12 21 12C20.4477 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V4.99997Z"
                        fill="#212529"
                      />
                    </svg>
                  </label>
                  {/* delete */}
                  <button
                    className="absolute right-1 top-1 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
                    type="button"
                    onClick={onDeletePhotoActive}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                        fill="#FB3E34"
                      />
                    </svg>
                  </button>
                  {/* deleteModal */}
                  {photoDeleteActive && (
                    <div className="absolute -right-2 top-8 z-10 animate-enter">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -top-3.5 right-2.5"
                      >
                        <path
                          d="M12.7526 8.86005C12.3542 8.40472 11.6458 8.40472 11.2474 8.86005L6.4512 14.3415C5.88544 14.988 6.34462 16 7.20377 16L16.7962 16C17.6554 16 18.1146 14.988 17.5488 14.3415L12.7526 8.86005Z"
                          fill="#ffffff"
                        />
                      </svg>
                      <div className="flex h-auto w-60 flex-col gap-4 rounded-2xl bg-background-elevated-light p-4 shadow-footer">
                        <label className="text-body2 font-semibold leading-body2 tracking-body2 text-content-primary-light">
                          이 사진을 삭제할까요?
                        </label>
                        <div className="flex flex-row items-center justify-end gap-1">
                          <RepresentativeButton
                            text="취소"
                            onActive={onDeletePhotoActive}
                          />
                          <RepresentativeButton
                            text="삭제"
                            color="text-static-white bg-state-negative-light"
                            onActive={() => onDeletePhoto(photo)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </figure>
            );
          })
        ) : (
          <EmptyBox text="사진을 추가해주세요." />
        )}
      </div>
    </section>
  );
};

export default PhotoMain;
