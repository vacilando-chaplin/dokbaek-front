import HumanMale from "../../../../../../../public/icons/HumanMale.svg";
import FaceRecognition from "../../../../../../../public/icons/FaceRecognition.svg";
import FaceManProfile from "../../../../../../../public/icons/FaceManProfile.svg";
import Plus from "../../../../../../../public/icons/Plus.svg";
import UploadButton from "@/components/atoms/uploadButton";

interface RecentPhotoFrameProps {
  text: string;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoModalOpen: React.MouseEventHandler<HTMLInputElement>;
}

const RecentPhotoFrame = ({
  text,
  onSelectFile,
  onPhotoModalOpen
}: RecentPhotoFrameProps) => {
  return (
    <div className="flex aspect-[160/204] h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-dotted border-gray-150 bg-gray-50 dark:border-border-active-light dark:bg-gray-800">
      {text === "전신 사진" && (
        <HumanMale
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      {text === "얼굴 정면 사진" && (
        <FaceRecognition
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      {text === "얼굴 좌측 사진" && (
        <FaceManProfile
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      {text === "얼굴 우측 사진" && (
        <FaceManProfile
          width="16"
          height="16"
          className="fill-current rotate-[-45deg] text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      <label className="typography-caption1 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
        {text}
      </label>
      <UploadButton
        type="secondaryOutlined"
        size="small"
        onClick={onPhotoModalOpen}
        onChange={onSelectFile}
      >
        <Plus
          width="12"
          height="12"
          className="fill-current text-content-primary-light dark:text-content-primary-dark"
        />
        추가
      </UploadButton>
    </div>
  );
};

export default RecentPhotoFrame;
