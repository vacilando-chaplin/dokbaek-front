import { filmoInputsTypes } from "@/types/types";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";
import RepresentativeButton from "../atoms/representiveButton";
import EmptyBox from "../atoms/emptyBox";
import CreateButton from "../atoms/createButton";

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
  onFilmoLink: (link: string) => void;
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
  onRepresentativeCheck,
  onFilmoLink
}: FilmographyMainProps) => {
  const classificationList = Array.from(
    new Set(
      filmoList.map((filmo: filmoInputsTypes) => {
        return filmo.classification;
      })
    )
  );

  const representativeActive = filmoList.find(
    (v: filmoInputsTypes) => v.representative
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
              <CreateButton onClick={onFilmoModalActive} />
            )}
          </div>
        </div>
      </div>
      {representativeActive && (
        <div className="flex h-auto w-full flex-col gap-2">
          <label className="text-body2 font-semibold leading-body2 tracking-body2 text-accent-primary-light">
            대표작
          </label>
          {editRepresentative.map((rep: filmoInputsTypes) => {
            return (
              <>
                {rep.representative && (
                  <FilmoItem
                    key={rep.id}
                    filmo={rep}
                    filmoRepresentActive={filmoRepresentActive}
                    representativeCount={representativeCount}
                    canEdit={true}
                    onEdit={onFilmoEditClick}
                    onDelete={onFilmoDeleteModalActive}
                    onSelect={onFilmoSelectClick}
                    onCheck={onRepresentativeCheck}
                    onLink={onFilmoLink}
                  />
                )}
              </>
            );
          })}
        </div>
      )}
      {classificationList.length >= 1 ? (
        classificationList.map((classification: string, index: number) => {
          const filmography = editRepresentative.filter(
            (filmo: filmoInputsTypes) => filmo.classification === classification
          );
          return (
            <>
              {filmography.find((v) => v.representative === false) && (
                <div
                  className="flex h-auto w-full flex-col gap-2"
                  key={classification + index}
                >
                  <label className="text-body2 font-medium leading-body2 tracking-body2 text-content-secondary-light">
                    {classification}
                  </label>
                  {filmography.map((filmo: filmoInputsTypes) => {
                    return (
                      <>
                        {filmo.representative === false && (
                          <FilmoItem
                            key={filmo.id}
                            filmo={filmo}
                            filmoRepresentActive={filmoRepresentActive}
                            representativeCount={representativeCount}
                            canEdit={true}
                            onEdit={onFilmoEditClick}
                            onDelete={onFilmoDeleteModalActive}
                            onSelect={onFilmoSelectClick}
                            onCheck={onRepresentativeCheck}
                            onLink={onFilmoLink}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </>
          );
        })
      ) : (
        <EmptyBox text="작품 활동을 추가해주세요." />
      )}
    </section>
  );
};

export default FilmographyMain;
