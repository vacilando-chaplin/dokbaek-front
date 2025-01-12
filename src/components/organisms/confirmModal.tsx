import BoxButton from "../atoms/boxButton";

interface ConfirmModalProps {
  dense: boolean;
  resizing: string;
  bodyText?: string;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfirmModal = ({
  dense,
  resizing,
  bodyText,
  onCancel,
  onConfirm
}: ConfirmModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div
        className={`interaction-default relative flex h-auto max-w-[480px] animate-enter flex-col rounded-3xl bg-background-elevated-light shadow-medium ${dense ? "gap-8 p-6" : "gap-10 p-8"} ${resizing === "fixed" ? "w-[480px]" : "w-full"}`}
      >
        <div className="flex flex-col gap-2 text-content-primary-light">
          <label className="typography-heading3 flex h-auto w-full gap-2 font-semibold">
            작품 활동을 삭제할까요?
          </label>
          {bodyText && (
            <p className="typography-body3 font-regular">{bodyText}</p>
          )}
        </div>
        <div className="flex h-auto w-full flex-row justify-end gap-2">
          <BoxButton type="secondaryOutlined" size="medium" onClick={onCancel}>
            취소
          </BoxButton>
          <BoxButton type="negative" size="medium" onClick={onConfirm}>
            삭제
          </BoxButton>
        </div>
      </div>
    </section>
  );
};

export default ConfirmModal;
