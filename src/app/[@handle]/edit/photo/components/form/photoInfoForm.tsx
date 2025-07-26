import Title from "@/components/atoms/title";
import { CategoryKey } from "../../types";
import { categoryDetails } from "../../data";
import PhotoLimitLabel from "./photoLimitLabel";
import TitleHelperText from "./titleHelperText";
import UploadButtonContainer from "./uploadButtonContainer";

interface PhotoInfoFormProps {
  hasLimit: boolean;
  hasButton: boolean;
  category: CategoryKey;
}

const PhotoInfoForm = ({
  hasLimit,
  hasButton,
  category
}: PhotoInfoFormProps) => {
  const { title, helperText } = categoryDetails[category] || {
    title: "",
    helperText: ""
  };

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <Title name={title} />
          {hasLimit && <PhotoLimitLabel limit={20} category={category} />}
        </div>
        <TitleHelperText text={helperText} />
      </div>
      {hasButton && <UploadButtonContainer category={category} />}
    </div>
  );
};

export default PhotoInfoForm;
