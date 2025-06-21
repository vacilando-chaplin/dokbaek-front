import Title from "@/components/atoms/title";
import LimitLabel from "./limitLabel";
import TitleHelperText from "./titleHelperText";
import UploadButton from "@/components/atoms/uploadButton";
import Plus from "../../../../../../../public/icons/Plus.svg";

interface PhotoInfoFormProps {
  title: string;
  helperText: string;
  disabled: boolean;
  limitValue: number | undefined;
  onModalOpen: React.MouseEventHandler<HTMLInputElement>;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoInfoForm = ({
  title,
  helperText,
  disabled,
  limitValue,
  onModalOpen,
  onSelectFile
}: PhotoInfoFormProps) => {
  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <Title name={title} />
          <LimitLabel value={limitValue} limit={20} />
        </div>
        <TitleHelperText text={helperText} />
      </div>
      <UploadButton
        type="primaryOutlined"
        size="small"
        disabled={disabled}
        onClick={onModalOpen}
        onChange={onSelectFile}
      >
        <Plus
          width="12"
          height="12"
          className="fill-current text-accent-primary-light dark:text-accent-primary-dark"
        />
        추가
      </UploadButton>
    </div>
  );
};

export default PhotoInfoForm;
