import Button from "../atoms/button";

interface ModalBottomProps {
  saveButtonText: string;
  disabled?: boolean;
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalBottom = ({
  saveButtonText,
  disabled,
  onCloseClick,
  onSaveClick
}: ModalBottomProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-end gap-2 border-t-[1px] border-border-default-light px-6 py-5 text-body3 font-medium leading-body3 tracking-body3">
      <Button text="취소" onClick={onCloseClick} />
      <Button
        text={saveButtonText}
        color="bg-accent-primary-light text-static-white"
        disabled={disabled}
        onClick={onSaveClick}
      />
    </div>
  );
};

export default ModalBottom;
