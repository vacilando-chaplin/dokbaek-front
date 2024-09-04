import Button from "../atoms/button";
import SaveButton from "../atoms/saveButton";

interface ModalBottomProps {
  saveButtonText: string;
  required?: boolean;
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalBottom = ({
  saveButtonText,
  required,
  onCloseClick,
  onSaveClick
}: ModalBottomProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-end gap-2 border-t-[1px] border-border-default-light px-6 py-5 text-body3 font-medium leading-body3 tracking-body3">
      <Button text="취소" onClick={onCloseClick} />
      <SaveButton
        text={saveButtonText}
        required={required}
        onClick={onSaveClick}
      />
    </div>
  );
};

export default ModalBottom;
