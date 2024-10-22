import { filmoInputsTypes } from "@/types/types";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";
import RepresentativeButton from "../atoms/representiveButton";
import EmptyBox from "../atoms/emptyBox";

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
                <RepresentativeButton
                  text="취소"
                  onActive={onCancelRepActive}
                />
              ) : (
                <RepresentativeButton
                  icon={true}
                  text="대표작 설정"
                  onActive={onRepresentativeActive}
                />
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
                    canLink={false}
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
        <EmptyBox text="작품 활동을 추가해주세요." />
      )}
    </section>
  );
};

export default FilmographyMain;
