import { classificationList } from "@/data/data";
import { filmoInputsTypes } from "@/types/types";
import CreateButton from "../atoms/createButton";
import EmptyBox from "../atoms/emptyBox";
import RepresentativeButton from "../atoms/representiveButton";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";

interface FilmographyMainProps {
  resultFilmoList: any;
  filmoRepresentActive: boolean;
  editRepresentative: filmoInputsTypes[];
  representativeCount: number;
  onRepresentativeActive: React.MouseEventHandler<HTMLButtonElement>;
  onSaveRepActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoEditClick: (filmo: filmoInputsTypes) => void;
  onFilmoDeleteModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoSelectClick: (filmo: filmoInputsTypes) => void;
  onRepresentativeCheck: (id: string) => void;
  onFilmoLink: (link: string) => void;
}

const FilmographyMain = ({
  resultFilmoList,
  filmoRepresentActive,
  editRepresentative,
  representativeCount,
  onRepresentativeActive,
  onSaveRepActive,
  onFilmoModalActive,
  onFilmoEditClick,
  onFilmoDeleteModalActive,
  onFilmoSelectClick,
  onRepresentativeCheck,
  onFilmoLink
}: FilmographyMainProps) => {
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
            {resultFilmoList.length >= 1 &&
              (filmoRepresentActive ? (
                <RepresentativeButton
                  text="취소"
                  onActive={onRepresentativeActive}
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
      { /* 대표작 */ }
      {/* {resultFilmoList.findIndex((v: any) => v.is_featured === true) && (
        <div className="flex h-auto w-full flex-col gap-2">
          <label className="text-body2 font-semibold leading-body2 tracking-body2 text-accent-primary-light">
            대표작
          </label>
          {resultFilmoList.map((rep: filmoInputsTypes) => {
            return (
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
            );
          })}
        </div>
      )} */}
      {resultFilmoList.length >= 1 ? (
        resultFilmoList.map((filmo: any, index: number) => {
          return (
            <>
`             <div
                className="flex h-auto w-full flex-col gap-2"
                key={filmo.id}
              >
              <label className="text-body2 font-medium leading-body2 tracking-body2 text-content-secondary-light">
                {classificationList[filmo.categoryId+1]}
              </label>
              {resultFilmoList.map((filmo: filmoInputsTypes) => {
                return (
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
                );
              })}
            </div>
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
