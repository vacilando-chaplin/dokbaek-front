import BoxButton from "../atoms/boxButton";

interface ModalFooterProps {
  text: string;
  disabled?: boolean;
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalFooter = ({
  text,
  disabled,
  onCloseClick,
  onSaveClick
}: ModalFooterProps) => {
  return (
    <div className="typography-body3 flex h-auto w-full items-center justify-end gap-2 border-t-[1px] border-border-default-light px-6 py-5 font-medium">
      <BoxButton type="secondaryOutlined" size="medium" onClick={onCloseClick}>
        취소
      </BoxButton>
      <BoxButton
        type="primary"
        size="medium"
        disabled={disabled}
        onClick={onSaveClick}
      >
        {text}
      </BoxButton>
    </div>
  );
};

export default ModalFooter;
