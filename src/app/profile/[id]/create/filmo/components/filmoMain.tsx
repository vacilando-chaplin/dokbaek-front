import { FilmoResponseType } from "@/lib/types";
import Title from "@/components/atoms/title";
import BoxButton from "@/components/atoms/boxButton";
import EmptyFrame from "@/components/atoms/emptyFrame";
import InfoCircle from "../../../../../../../public/icons/InfoCircle.svg";
import Plus from "../../../../../../../public/icons/Plus.svg";
import FilmoItem from "../../../components/filmoItem";

interface FilmoMainProps {
  filmoList: FilmoResponseType[];
  filmoRepEditList: FilmoResponseType[];
  categoryList: string[];
  filmoRepresentActive: boolean;
  onFilmoRepActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoRepCancel: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoRepSave: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoModalOpen: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoEditModalOpen: (filmo: FilmoResponseType) => void;
  onFilmoDeleteModalOpen: (id: number) => void;
  onFilmoRepCheck: (id: number) => void;
  onLinkModalOpen: (link: string) => void;
}

const FilmoMain = ({
  filmoList,
  filmoRepEditList,
  categoryList,
  filmoRepresentActive,
  onFilmoRepActive,
  onFilmoRepCancel,
  onFilmoRepSave,
  onFilmoModalOpen,
  onFilmoEditModalOpen,
  onFilmoDeleteModalOpen,
  onFilmoRepCheck,
  onLinkModalOpen
}: FilmoMainProps) => {
  const repFilmoList = filmoList.filter(
    (filmo: FilmoResponseType) => filmo.featured === true
  );

  const checkRep = filmoRepEditList.length >= 6;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex w-full flex-row justify-between">
        <Title name="작품 활동" />
        <div className="flex flex-row items-center gap-4">
          {filmoRepresentActive && (
            <label className="typography-body2 font-medium text-accent-primary-light">
              프로필 메인에 표시할 대표작을 선택해주세요. (최대6개)
            </label>
          )}
          <div className="flex items-center gap-1">
            {filmoList.length >= 1 &&
              (filmoRepresentActive ? (
                <BoxButton
                  type="secondaryOutlined"
                  size="small"
                  onClick={onFilmoRepCancel}
                >
                  취소
                </BoxButton>
              ) : (
                <BoxButton
                  type="secondaryOutlined"
                  size="small"
                  onClick={onFilmoRepActive}
                >
                  대표작 설정
                  <InfoCircle width="12" height="12" fill="#868E96" />
                </BoxButton>
              ))}
            {filmoRepresentActive ? (
              <BoxButton
                type="primaryOutlined"
                size="small"
                onClick={onFilmoRepSave}
              >
                완료
              </BoxButton>
            ) : (
              <BoxButton
                type="primaryOutlined"
                size="small"
                onClick={onFilmoModalOpen}
              >
                <Plus width="12" height="12" fill="#1E85EF" />
                추가
              </BoxButton>
            )}
          </div>
        </div>
      </div>
      {/* 대표작 */}
      {filmoRepresentActive && filmoList.length >= 1 && (
        <div className="flex h-auto w-full flex-col gap-2">
          <label className="typography-body2 font-semibold text-accent-primary-light">
            대표작
          </label>
          {repFilmoList.map((filmo: FilmoResponseType) => {
            const checked =
              filmoRepEditList.find((item) => item.id === filmo.id) !==
              undefined;
            return (
              <FilmoItem
                key={filmo.id}
                filmo={filmo}
                checked={checked}
                checkDisabled={checkRep}
                filmoRepresentActive={filmoRepresentActive}
                canEdit={true}
                onCheck={onFilmoRepCheck}
                onLink={onLinkModalOpen}
              />
            );
          })}
        </div>
      )}
      {!filmoRepresentActive && repFilmoList.length >= 1 && (
        <div className="flex h-auto w-full flex-col gap-2">
          <label className="typography-body2 font-semibold text-accent-primary-light">
            대표작
          </label>
          {repFilmoList.map((filmo: FilmoResponseType) => {
            return (
              <FilmoItem
                key={filmo.id}
                filmo={filmo}
                checkDisabled={checkRep}
                filmoRepresentActive={filmoRepresentActive}
                canEdit={true}
                onEdit={onFilmoEditModalOpen}
                onDelete={onFilmoDeleteModalOpen}
                onLink={onLinkModalOpen}
              />
            );
          })}
        </div>
      )}
      {!filmoRepresentActive &&
        filmoList.length >= 1 &&
        filmoList.length !== repFilmoList.length &&
        categoryList.map((category: string, index: number) => {
          const filteredFilmoList = filmoList.filter(
            (item: FilmoResponseType) =>
              item.production.category.name === category &&
              item.featured === false
          );
          return (
            <div
              className="flex h-auto w-full flex-col gap-2"
              key={category + index}
            >
              <label className="typography-body2 font-medium text-content-secondary-light">
                {category}
              </label>
              {filteredFilmoList.map((filmo: FilmoResponseType) => {
                return (
                  <FilmoItem
                    key={filmo.id}
                    filmo={filmo}
                    checkDisabled={checkRep}
                    filmoRepresentActive={filmoRepresentActive}
                    canEdit={true}
                    onEdit={onFilmoEditModalOpen}
                    onDelete={onFilmoDeleteModalOpen}
                    onLink={onLinkModalOpen}
                  />
                );
              })}
            </div>
          );
        })}
      {filmoRepresentActive &&
        filmoList.length >= 1 &&
        filmoList.length !== repFilmoList.length &&
        categoryList.map((category: string, index: number) => {
          const filteredFilmoList = filmoList.filter(
            (item: FilmoResponseType) =>
              item.production.category.name === category &&
              item.featured === false
          );
          return (
            <div
              className="flex h-auto w-full flex-col gap-2"
              key={category + index}
            >
              <label className="typography-body2 font-medium text-content-secondary-light">
                {category}
              </label>
              {filteredFilmoList.map((filmo: FilmoResponseType) => {
                const checked =
                  filmoRepEditList.find((item) => item.id === filmo.id) !==
                  undefined;
                return (
                  <FilmoItem
                    key={filmo.id}
                    filmo={filmo}
                    checked={checked}
                    checkDisabled={checkRep}
                    filmoRepresentActive={filmoRepresentActive}
                    canEdit={true}
                    onCheck={onFilmoRepCheck}
                    onLink={onLinkModalOpen}
                  />
                );
              })}
            </div>
          );
        })}
      {filmoList.length === 0 && (
        <EmptyFrame text="작품 활동을 추가해주세요." />
      )}
    </section>
  );
};

export default FilmoMain;
