import BoxButton from "../atoms/boxButton";
import Plus from "../../../public/icons/Plus.svg";

interface EmptyStateProps {
  text: string;
  button: boolean;
  buttonSize: string;
  buttonText: string;
  buttonType: string;
  otherUser?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const EmptyState = ({
  text,
  button,
  buttonSize,
  buttonText,
  buttonType,
  otherUser,
  onClick
}: EmptyStateProps) => {
  return (
    <div
      className={`h-auto w-full rounded-lg border border-border-default-light bg-gray-50 dark:border-border-default-dark dark:bg-gray-950 ${otherUser === false ? "py-12" : "py-20"}`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <label className="typography-body2 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
            {text}
          </label>
        </div>
        {button && otherUser === false && (
          <BoxButton type={buttonType} size={buttonSize} onClick={onClick}>
            <Plus
              width="12"
              height="12"
              className="fill-current text-content-primary-light dark:text-content-primary-dark"
            />
            {buttonText}
          </BoxButton>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
