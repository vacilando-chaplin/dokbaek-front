import BoxButton from "@/components/atoms/boxButton";

interface FilmoRepModalFooterProps {
  text: string;
  count: number;
  disabled?: boolean;
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmoRepModalFooter = ({
  text,
  count,
  disabled,
  onCloseClick,
  onSaveClick
}: FilmoRepModalFooterProps) => {
  return (
    <div className="typography-body3 flex h-auto w-full flex-row items-center justify-end gap-4 border-t-[1px] border-border-default-light px-6 py-5 dark:border-border-default-dark">
      <span className="font-semibold text-content-primary-light dark:text-content-primary-dark">
        {count}/6개 선택됨
      </span>
      <div className="flex h-auto items-center gap-2 font-medium">
        <BoxButton
          type="secondaryOutlined"
          size="medium"
          onClick={onCloseClick}
        >
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
    </div>
  );
};

export default FilmoRepModalFooter;
