import BoxButton from "../atoms/boxButton";

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
        <div className="shadow-medium relative flex h-auto w-full animate-enter flex-col items-center justify-center gap-10 rounded-3xl bg-background-elevated-light p-8 transition-all duration-100 ease-linear">
          <label className="flex h-auto w-full gap-2 text-heading3 font-semibold leading-heading3 tracking-heading3 text-content-primary-light">
            작품 활동을 삭제할까요?
          </label>
          <div className="flex h-auto w-full flex-row justify-end gap-2">
            <BoxButton
              type="secondaryOutlined"
              size="medium"
              onClick={onCancel}
            >
              취소
            </BoxButton>
            <BoxButton type="negative" size="medium" onClick={onDelete}>
              삭제
            </BoxButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmographyDeleteModal;
