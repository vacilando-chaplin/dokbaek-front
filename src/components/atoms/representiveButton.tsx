import InfoCircle from "../../../public/icons/InfoCircle.svg";

interface RepresentativeButtonProps {
  icon?: boolean;
  text: string;
  color?: string;
  onActive?: React.MouseEventHandler<HTMLButtonElement>;
}

const RepresentativeButton = ({
  icon,
  text,
  color,
  onActive
}: RepresentativeButtonProps) => {
  return (
    <button
      className={`flex h-auto w-auto items-center gap-1 rounded-[10px] px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 ${color ? color : "border border-border-default-light bg-background-surface-light text-content-primary-light"}`}
      type="button"
      onClick={onActive}
    >
      {text}
      {icon && <InfoCircle width="12" height="12" fill="#868E96" />}
    </button>
  );
};

export default RepresentativeButton;
