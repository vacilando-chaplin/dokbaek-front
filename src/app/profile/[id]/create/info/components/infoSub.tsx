import Title from "@/components/atoms/title";
import { InfoEducationActiveType } from "../types";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { EducationWithIdType } from "@/lib/types";
import EducationForm from "./educationForm";

interface infoSubProps {
  education: EducationWithIdType[];
  educationActives: InfoEducationActiveType;
  schoolList: string[];
  onSchoolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMajorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSchoolDropdownActive: () => void;
  onEducationDropdownActive: () => void;
  onSchoolDropdownClick: (name: string, item: string) => void;
  onEducationDropdownClick: (name: string, item: string) => void;
  onBlurEducation: (educationId: number) => void;
  onCreateEducation: () => void;
  onDeleteEducation: (educationId: number) => void;
}

const InfoSub = ({
  education,
  educationActives,
  schoolList,
  onSchoolChange,
  onMajorChange,
  onSchoolDropdownActive,
  onEducationDropdownActive,
  onSchoolDropdownClick,
  onEducationDropdownClick,
  onBlurEducation,
  onCreateEducation,
  onDeleteEducation
}: infoSubProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <div className="flex flex-row items-center justify-between">
        <Title name="학력" />
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center gap-2.5 rounded-lg"
          disabled={education.length >= 1}
          onClick={onCreateEducation}
        >
          <Plus
            width="16"
            height="16"
            className={`fill-current ${education.length >= 1 ? "text-content-disabled-light dark:text-content-disabled-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
          />
        </button>
      </div>
      {education.length >= 1 &&
        education.map((item: EducationWithIdType) => {
          return (
            <EducationForm
              key={item.id}
              item={item}
              educationActives={educationActives}
              schoolList={schoolList}
              onSchoolChange={onSchoolChange}
              onMajorChange={onMajorChange}
              onSchoolDropdownActive={onSchoolDropdownActive}
              onEducationDropdownActive={onEducationDropdownActive}
              onSchoolDropdownClick={onSchoolDropdownClick}
              onEducationDropdownClick={onEducationDropdownClick}
              onBlurEducation={onBlurEducation}
              onDelete={() => onDeleteEducation(item.id)}
            />
          );
        })}
    </section>
  );
};

export default InfoSub;
