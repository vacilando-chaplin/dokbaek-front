import { classificationList } from "@/data/data";
import { filmoInputsTypes } from "@/types/types";
import CreateButton from "../atoms/createButton";
import EmptyBox from "../atoms/emptyBox";
import RepresentativeButton from "../atoms/representiveButton";
import Title from "../atoms/title";
import FilmoItem from "../molecules/filmoItem";

interface FilmographyMainProps {
  filmoList: any;
  categoryList: string[];
  filmoRepresentActive: boolean;
  representativeCount: number;
  onFilmoRepActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoRepCancel: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoRepSave: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoEditModalOpen: (filmo: filmoInputsTypes) => void;
  onFilmoDeleteModalOpen: (id: number) => void;
  onFilmoRepCheck: (id: number) => void;
  onFilmoLink: (link: string) => void;
}

const FilmographyMain = ({
  filmoList,
  categoryList,
  filmoRepresentActive,
  representativeCount,
  onFilmoRepActive,
  onFilmoRepCancel,
  onFilmoRepSave,
  onFilmoModalActive,
  onFilmoEditModalOpen,
  onFilmoDeleteModalOpen,
  onFilmoRepCheck,
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
            {filmoList.length >= 1 &&
              (filmoRepresentActive ? (
                <RepresentativeButton text="취소" onActive={onFilmoRepCancel} />
              ) : (
                <RepresentativeButton
                  icon={true}
                  text="대표작 설정"
                  onActive={onFilmoRepActive}
                />
              ))}
            {filmoRepresentActive ? (
              <button
                className="flex h-auto w-auto flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-accent-primary-light"
                onClick={onFilmoRepSave}
              >
                완료
              </button>
            ) : (
              <CreateButton onClick={onFilmoModalActive} />
            )}
          </div>
        </div>
      </div>
      {/* 대표작 */}
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
      {filmoList.length >= 1 ? (
        categoryList.map((category: string, index: number) => {
          const filteredFilmoList = filmoList.filter(
            (item: any) => item.production.category.name === category
          );
          return (
            <>
              <div
                className="flex h-auto w-full flex-col gap-2"
                key={category + index}
              >
                <label className="text-body2 font-medium leading-body2 tracking-body2 text-content-secondary-light">
                  {category}
                </label>
                {filteredFilmoList.map((filmo: filmoInputsTypes) => {
                  return (
                    <FilmoItem
                      key={filmo.id}
                      filmo={filmo}
                      filmoRepresentActive={filmoRepresentActive}
                      representativeCount={representativeCount}
                      canEdit={true}
                      onEdit={onFilmoEditModalOpen}
                      onDelete={onFilmoDeleteModalOpen}
                      onCheck={onFilmoRepCheck}
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
