import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import SearchDropdown from "@/components/molecules/searchDropdown";
import SelectDropdown from "@/components/molecules/selectDropdown";
import ThreeBars from "../../../../../../../public/icons/ThreeBars.svg";
import X from "../../../../../../../public/icons/X.svg";
import { EducationWithIdType } from "@/lib/types";

interface EducationFormProps {
  item: EducationWithIdType;
  schoolList: string[];
  onDelete: () => void;
}

const EducationForm = ({ item, schoolList, onDelete }: EducationFormProps) => {
  return (
    <div className="flex h-auto w-full flex-col gap-4 rounded-lg border border-border-default-light bg-background-surface-light p-6">
      <div className="flex h-auto w-full items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-1.5">
          <ThreeBars width="14" height="14" color="#ADB5BD" />
          <label className="typography-body2 font-semibold text-content-primary-light">
            학교 정보
          </label>
        </div>
        <button
          type="button"
          className="flex h-5 w-5 items-center justify-center rounded-md border border-border-default-light bg-background-surface-light p-1"
          onClick={onDelete}
        >
          <X width="12" height="12" fill="#FB3E34" />
        </button>
      </div>
      {/* <div className="flex h-auto w-full flex-row gap-4">
        <Label label="학교 이름" />
        <SearchDropdown
          size="medium"
          name={String(item.id)}
          list={schoolList}
          value={item.school.name}
          active={infoActives.school}
          selected={item.school.name}
          isEmpty={infoActives.school && schoolList.length === 0}
          maxLength={20}
          placeholder="학교 이름을 검색해보세요."
          onClick={onItemClick}
          onActive={onInfoDropdownActive}
          onChange={onSchoolChange}
          onSave={onBlurEducation}
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
              onBlur={onBlurEducation}
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
              onSave={onBlurEducation}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EducationForm;
