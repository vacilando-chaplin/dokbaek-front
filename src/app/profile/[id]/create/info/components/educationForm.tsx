import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import SearchDropdown from "@/components/molecules/searchDropdown";
import SelectDropdown from "@/components/molecules/selectDropdown";
import ThreeBars from "../../../../../../../public/icons/ThreeBars.svg";
import X from "../../../../../../../public/icons/X.svg";
import { EducationWithIdType } from "@/lib/types";
import { InfoEducationActiveType } from "../types";
import { educationList } from "@/lib/data";

interface EducationFormProps {
  item: EducationWithIdType;
  educationActives: InfoEducationActiveType;
  schoolList: string[];
  onSchoolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMajorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSchoolDropdownActive: () => void;
  onEducationDropdownActive: () => void;
  onSchoolDropdownClick: (name: string, item: string) => void;
  onEducationDropdownClick: (name: string, item: string) => void;
  onBlurEducation: (educationId: number) => void;
  onDelete: () => void;
}

const EducationForm = ({
  item,
  educationActives,
  schoolList,
  onSchoolChange,
  onMajorChange,
  onSchoolDropdownActive,
  onEducationDropdownActive,
  onSchoolDropdownClick,
  onEducationDropdownClick,
  onBlurEducation,
  onDelete
}: EducationFormProps) => {
  return (
    <div className="flex h-auto w-full flex-col gap-4 rounded-lg border border-border-default-light bg-background-surface-light p-6 dark:border-border-default-dark dark:bg-background-surface-dark">
      <div className="flex h-auto w-full items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-1.5">
          {/* <ThreeBars width="14" height="14" color="#ADB5BD" /> */}
          <label className="typography-body2 font-semibold text-content-primary-light">
            학교 정보
          </label>
        </div>
        <button
          type="button"
          className="flex h-5 w-5 items-center justify-center rounded-md border border-border-default-light bg-background-surface-light p-1 dark:border-border-default-dark dark:bg-background-surface-dark"
          disabled={item.school.name === ""}
          onClick={onDelete}
        >
          <X
            width="12"
            height="12"
            fill="#FB3E34"
            className={`${item.school.name === "" && "opacity-40"}`}
          />
        </button>
      </div>
      <div className="flex h-auto w-full flex-col">
        <Label label="학교 이름" />
        <SearchDropdown
          size="medium"
          name="name"
          list={schoolList}
          value={item.school.name}
          active={educationActives.school}
          selected={item.school.name}
          isEmpty={educationActives.school && schoolList.length === 0}
          maxLength={20}
          placeholder="학교 이름을 검색해보세요."
          onClick={onSchoolDropdownClick}
          onActive={onSchoolDropdownActive}
          onChange={onSchoolChange}
          onSave={() => onBlurEducation(item.id)}
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
              value={item.major}
              maxLength={20}
              onChange={onMajorChange}
              onBlur={() => onBlurEducation(item.id)}
            />
          </div>
          <div className="flex flex-[1_1_25%]">
            <SelectDropdown
              name="education"
              list={educationList}
              size="medium"
              value={item.status}
              active={educationActives.education}
              selected={item.status}
              onClick={onEducationDropdownClick}
              onActive={onEducationDropdownActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
