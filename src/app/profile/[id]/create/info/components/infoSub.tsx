<<<<<<< HEAD:src/app/profile/[id]/create/info/components/infoSub.tsx
import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import Title from "@/components/atoms/title";
import SearchDropdown from "@/components/molecules/searchDropdown";
import SelectDropdown from "@/components/molecules/selectDropdown";
import { educationList } from "@/lib/data";
import { InfoActiveType, InfoInputType } from "../types";
=======
import { educationList } from "@/data/data";
import { InfoActiveType, InfoInputType } from "@/types/types";
import Label from "../atoms/label";
import Title from "../atoms/title";
import SelectDropdown from "../molecules/selectDropdown";
import SearchDropdown from "../molecules/searchDropdown";
import TextInput from "../atoms/textInput";
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제):src/components/organisms/infoSub.tsx

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
        <div className="flex h-auto w-full">
          <SearchDropdown
            size="medium"
            name="school"
            list={schoolList}
            value={school}
            active={infoActives.school}
            selected={school}
            isEmpty={infoActives.school && schoolList.length === 0}
            maxLength={20}
            placeholder="학교 이름을 검색해보세요."
            onClick={onItemClick}
            onActive={onInfoDropdownActive}
            onChange={onSchoolChange}
          />
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="전공" />
          <div className="flex h-auto w-full flex-row gap-4">
            <div className="flex w-full flex-[1_1_75%]">
              <TextInput
                type="text"
                size="medium"
                name="major"
                value={major}
                maxLength={20}
                onChange={onInputChange}
              />
            </div>
            <div className="flex flex-[1_1_25%]">
              <SelectDropdown
                name="education"
                list={educationList}
                size="medium"
                value={education}
                active={infoActives.education}
                selected={education}
                onClick={onItemClick}
                onActive={onInfoDropdownActive}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSub;
