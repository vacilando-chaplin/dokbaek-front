import { filmoInputsTypes } from "@/types/types";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";

interface FilmographyMainProps {
  filmoList: filmoInputsTypes[];
  filmoRepresentActive: boolean;
  editRepresentative: filmoInputsTypes[];
  representativeCount: number;
  onRepresentativeActive: React.MouseEventHandler<HTMLButtonElement>;
  onCancelRepActive: React.MouseEventHandler<HTMLButtonElement>;
  onSaveRepActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoEditClick: (filmo: filmoInputsTypes) => void;
  onFilmoDeleteModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoSelectClick: (filmo: filmoInputsTypes) => void;
  onRepresentativeCheck: (id: string) => void;
}

const FilmographyMain = ({
  filmoList,
  filmoRepresentActive,
  editRepresentative,
  representativeCount,
  onRepresentativeActive,
  onCancelRepActive,
  onSaveRepActive,
  onFilmoModalActive,
  onFilmoEditClick,
  onFilmoDeleteModalActive,
  onFilmoSelectClick,
  onRepresentativeCheck
}: FilmographyMainProps) => {
  const classificationList = Array.from(
    new Set(
      filmoList.map((filmo: filmoInputsTypes) => {
        return filmo.classification;
      })
    )
  );

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex w-full flex-row justify-between">
        <Title name="작품 활동" />
        <div className="flex flex-row items-center gap-4">
          {filmoRepresentActive && (
            <label className="text-body2 font-medium leading-body2 tracking-body2 text-accent-primary-light">
              프로필 메인에 표시할 대표작을 선택해주세요. (최대6개)
            </label>
          )}
          <div className="flex items-center gap-1">
            {filmoList.length >= 1 &&
              (filmoRepresentActive ? (
                <button
                  className="flex h-auto w-auto items-center gap-1 rounded-[10px] border border-border-default-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-content-primary-light"
                  type="button"
                  onClick={onCancelRepActive}
                >
                  취소
                </button>
              ) : (
                <button
                  className="flex h-auto w-auto items-center gap-1 rounded-[10px] border border-border-default-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-content-primary-light"
                  type="button"
                  onClick={onRepresentativeActive}
                >
                  대표작 설정
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10.5C12.5523 10.5 13 10.9477 13 11.5V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11.5C11 10.9477 11.4477 10.5 12 10.5Z"
                      fill="#868E96"
                    />
                    <path
                      d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V7.5C11 8.05228 11.4477 8.5 12 8.5C12.5523 8.5 13 8.05228 13 7.5V7Z"
                      fill="#868E96"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      fill="#868E96"
                    />
                  </svg>
                </button>
              ))}
            {filmoRepresentActive ? (
              <button
                className="flex h-auto w-auto flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-accent-primary-light"
                onClick={onSaveRepActive}
              >
                완료
              </button>
            ) : (
              <button
                className="flex h-auto w-auto flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-accent-primary-light"
                onClick={onFilmoModalActive}
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
                    d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z"
                    fill="#1E85EF"
                  />
                </svg>
                추가
              </button>
            )}
          </div>
        </div>
      </div>
      {classificationList.length >= 1 ? (
        classificationList.map((classification: string, index: number) => {
          const filmography = editRepresentative.filter(
            (filmo: filmoInputsTypes) => filmo.classification === classification
          );
          return (
            <div
              className="flex h-auto w-full flex-col gap-2"
              key={classification + index}
            >
              <label className="text-body2 font-medium leading-body2 tracking-body2 text-content-secondary-light">
                {classification}
              </label>
              {filmography.map((filmo: filmoInputsTypes, index: number) => {
                return (
                  <FilmoItem
                    key={filmo.title + index}
                    filmo={filmo}
                    filmoRepresentActive={filmoRepresentActive}
                    representativeCount={representativeCount}
                    canEdit={true}
                    onEdit={onFilmoEditClick}
                    onDelete={onFilmoDeleteModalActive}
                    onSelect={onFilmoSelectClick}
                    onCheck={onRepresentativeCheck}
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <label className="flex h-auto w-full items-center justify-center gap-4 rounded-xl border border-gray-150 bg-background-surface-light px-6 py-16 text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light">
          작품 활동을 추가해주세요.
        </label>
      )}
    </section>
  );
};

export default FilmographyMain;
