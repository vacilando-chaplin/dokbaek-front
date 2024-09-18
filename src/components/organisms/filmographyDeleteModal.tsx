import Button from "../atoms/button";

interface FilmographyDeleteModalProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmographyDeleteModal = ({
  onCancel,
  onDelete
}: FilmographyDeleteModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative max-h-full w-full max-w-[480px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center gap-10 rounded-3xl bg-background-elevated-light p-8 shadow-modal transition-all duration-100 ease-linear">
          <label className="flex h-auto w-full gap-2 text-heading3 font-semibold leading-heading3 tracking-heading3 text-content-primary-light">
            작품 활동을 삭제할까요?
          </label>
          <div className="flex h-auto w-full flex-row justify-end gap-2">
            <Button text="취소" onClick={onCancel} />
            <Button
              text="삭제"
              color="bg-state-negative-light text-static-white"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmographyDeleteModal;
