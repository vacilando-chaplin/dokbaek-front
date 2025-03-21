import BoxButton from "../atoms/boxButton";

interface ConfirmModalProps {
  dense: boolean;
  resizing: string;
  titleText: string;
  cancelText: string;
  confirmText: string;
  cancelButtonType: string;
  confirmButtonType: string;
  bodyText?: string;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfirmModal = ({
  dense,
  resizing,
  bodyText,
  titleText,
  cancelText,
  confirmText,
  cancelButtonType,
  confirmButtonType,
  onCancel,
  onConfirm
}: ConfirmModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0 dark:bg-background-scrim-dark">
      <div
        className={`interaction-default relative flex h-auto max-w-[480px] animate-enter flex-col rounded-3xl bg-background-elevated-light shadow-medium dark:bg-background-elevated-dark ${dense ? "gap-8 p-6" : "gap-10 p-8"} ${resizing === "fixed" ? "w-[480px]" : "w-full"}`}
      >
        <div className="flex flex-col gap-2 text-content-primary-light dark:text-content-primary-dark">
          <label className="typography-heading3 flex h-auto w-full gap-2 font-semibold">
            {titleText}
          </label>
          {bodyText && (
            <p className="typography-body3 font-regular">{bodyText}</p>
          )}
        </div>
        <div className="flex h-auto w-full flex-row justify-end gap-2">
          <BoxButton type={cancelButtonType} size="medium" onClick={onCancel}>
            {cancelText}
          </BoxButton>
          <BoxButton type={confirmButtonType} size="medium" onClick={onConfirm}>
            {confirmText}
          </BoxButton>
        </div>
      </div>
    </section>
  );
};

export default ConfirmModal;
