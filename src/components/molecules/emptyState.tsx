import BoxButton from "../atoms/boxButton";
import InfoCircle from "../../../public/icons/InfoCircle.svg";
import Plus from "../../../public/icons/Plus.svg";

interface EmptyStateProps {
  text: string;
  button?: boolean;
  buttonSize: string;
  buttonText: string;
  buttonType: string;
  icon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const EmptyState = ({
  text,
  button,
  buttonSize,
  buttonText,
  buttonType,
  icon,
  onClick
}: EmptyStateProps) => {
  return (
    <div className="h-auto w-full rounded-lg border border-border-default-light bg-gray-50 py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          {icon && <InfoCircle width="20" height="20" fill="#868E96" />}
          <label className="typography-body2 font-medium text-content-tertiary-light">
            {text}
          </label>
        </div>
        {button && (
          <BoxButton type={buttonType} size={buttonSize} onClick={onClick}>
            <Plus width="12" height="12" fill="#212529" />
            {buttonText}
          </BoxButton>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
