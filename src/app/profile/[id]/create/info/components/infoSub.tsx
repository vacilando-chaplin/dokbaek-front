import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import Title from "@/components/atoms/title";
import SearchDropdown from "@/components/molecules/searchDropdown";
import SelectDropdown from "@/components/molecules/selectDropdown";
import { educationList } from "@/lib/data";
import { InfoActiveType, InfoEducationType } from "../types";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { EducationWithIdType } from "@/lib/types";
import EducationForm from "./educationForm";

interface infoSubProps {
  education: EducationWithIdType[];
  infoActives: InfoActiveType;
  schoolList: string[];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSchoolChange: React.ChangeEventHandler<HTMLInputElement>;
  onInfoDropdownActive: (name: string, state: boolean) => void;
  onItemClick: (name: string, item: string) => void;
  onBlurEducation: (educationId: number) => void;
  onCreateEducation: () => void;
  onDeleteEducation: (educationId: number) => void;
}

const InfoSub = ({
  education,
  infoActives,
  schoolList,
  onInputChange,
  onSchoolChange,
  onInfoDropdownActive,
  onItemClick,
  onBlurEducation,
  onCreateEducation,
  onDeleteEducation
}: infoSubProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex flex-row items-center justify-between">
        <Title name="학력" />
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center gap-2.5 rounded-lg"
          onClick={onCreateEducation}
        >
          <Plus width="16" height="16" fill="#212529" />
        </button>
      </div>
      {education.length >= 1 &&
        education.map((item: EducationWithIdType) => {
          return (
            <EducationForm
              item={item}
              schoolList={schoolList}
              onDelete={() => onDeleteEducation(item.id)}
            />
          );
        })}
    </section>
  );
};

export default InfoSub;
