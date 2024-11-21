import RepresentativeButton from "../atoms/representiveButton";

interface DeleteModalProps {
  text: string;
  id: string;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: string) => void;
}

const DeleteModal = ({ text, id, onCancel, onDelete }: DeleteModalProps) => {
  return (
    <div className="absolute -right-2 top-8 z-10 animate-enter">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-3.5 right-2.5"
      >
        <path
          d="M12.7526 8.86005C12.3542 8.40472 11.6458 8.40472 11.2474 8.86005L6.4512 14.3415C5.88544 14.988 6.34462 16 7.20377 16L16.7962 16C17.6554 16 18.1146 14.988 17.5488 14.3415L12.7526 8.86005Z"
          fill="#ffffff"
        />
      </svg>
      <div className="flex h-auto w-60 flex-col gap-4 rounded-2xl bg-background-elevated-light p-4 shadow-footer">
        <label className="text-body2 font-semibold leading-body2 tracking-body2 text-content-primary-light">
          {text}
        </label>
        <div className="flex flex-row items-center justify-end gap-1">
          <RepresentativeButton text="취소" onActive={onCancel} />
          <RepresentativeButton
            text="삭제"
            color="text-static-white bg-state-negative-light"
            onActive={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
