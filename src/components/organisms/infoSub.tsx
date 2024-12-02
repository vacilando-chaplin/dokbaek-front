import { educationList } from "@/data/data";
import { InfoActiveType, InfoInputType } from "@/types/types";
import Input from "../atoms/input";
import Label from "../atoms/label";
import Title from "../atoms/title";
import Dropdown from "../molecules/dropdown";
import InputWithLabel from "../molecules/inputWithLabel";

interface infoSubProps {
  infoInputs: InfoInputType;
  infoActives: InfoActiveType;
  schoolList: string[];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSchoolChange: React.ChangeEventHandler<HTMLInputElement>;
  onInfoDropdownActive: (name: string, state: boolean) => void;
  onItemClick: (name: string, item: string) => void;
}

const InfoSub = ({
  infoInputs,
  infoActives,
  schoolList,
  onInputChange,
  onSchoolChange,
  onInfoDropdownActive,
  onItemClick
}: infoSubProps) => {
  const { school, major, education } = infoInputs;
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="학력" />
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="relative flex h-auto w-full">
          <InputWithLabel
            label="학교 이름"
            type="text"
            placeholder="학교 이름을 검색해보세요."
            dropdown={true}
            maxLength={20}
            name="school"
            value={school}
            active={infoActives.school}
            onChange={onSchoolChange}
            onActive={onInfoDropdownActive}
          />
          {infoActives.school && (
            <div className="absolute top-[76px] z-40 w-full">
              {schoolList.length >= 1 ? (
                <Dropdown
                  name="school"
                  content={schoolList}
                  active={infoActives.school}
                  selected={school}
                  onClick={onItemClick}
                  onActive={onInfoDropdownActive}
                />
              ) : (
                <div className="no-scrollbar max-h-40 w-full animate-enter list-none flex-col overflow-auto rounded-xl bg-background-elevated-light p-3 text-body3 font-normal leading-body3 tracking-body3 text-gray-300 shadow-low transition-all duration-100 ease-linear">
                  <label>입력하신 학교를 찾을 수 없습니다.</label>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="전공" />
          <div className="flex h-auto w-full flex-row gap-4">
            <div className="flex flex-[1_1_75%]">
              <Input
                type="text"
                maxLength={20}
                name="major"
                value={major}
                onChange={onInputChange}
              />
            </div>
            <div
              className="relative flex w-full flex-[1_1_25%]"
              onClick={() =>
                onInfoDropdownActive("education", infoActives.education)
              }
            >
              <Input
                type="button"
                dropdown={true}
                maxLength={10}
                name="education"
                value={education}
                readOnly={true}
                active={infoActives.education}
                onActive={onInfoDropdownActive}
              />
              {infoActives.education && (
                <div className="absolute top-12 z-40 w-full">
                  <Dropdown
                    name="education"
                    content={educationList}
                    active={infoActives.education}
                    selected={education}
                    onClick={onItemClick}
                    onActive={onInfoDropdownActive}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSub;
