import BoxButton from "../atoms/boxButton";

interface ModalBottomProps {
  text: string;
  disabled?: boolean;
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalBottom = ({
  text,
  disabled,
  onCloseClick,
  onSaveClick
}: ModalBottomProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-end gap-2 border-t-[1px] border-border-default-light px-6 py-5 text-body3 font-medium leading-body3 tracking-body3">
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

export default ModalBottom;
