import ArrowTriangleUp from "../../../public/icons/ArrowTriangleUp.svg";
import BoxButton from "../atoms/boxButton";

interface DeleteModalProps {
  id: string;
  text: string;
  category: string;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: string, category: string) => void;
}

const DeleteModal = ({
  id,
  text,
  category,
  onCancel,
  onDelete
}: DeleteModalProps) => {
  return (
    <div className="absolute -right-2 top-10 z-10 animate-enter shadow-low">
      <ArrowTriangleUp
        width="24"
        height="24"
        fill="#ffffff"
        className="absolute -top-3.5 right-3.5"
      />
      <div className="flex h-auto w-60 flex-col gap-4 rounded-2xl bg-background-elevated-light p-4 dark:bg-background-elevated-dark">
        <label className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
          {text}
        </label>
        <div className="flex flex-row items-center justify-end gap-1">
          <BoxButton type="secondaryOutlined" size="small" onClick={onCancel}>
            취소
          </BoxButton>
          <BoxButton
            type="negative"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id, category);
            }}
          >
            삭제
          </BoxButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
