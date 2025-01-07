import InfoCircle from "../../../public/icons/InfoCircle.svg";

interface ProfileEmptyProps {
  text: string;
}

const ProfileEmpty = ({ text }: ProfileEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <InfoCircle width="20" height="20" fill="#868E96" />
      <label className="typography-body2 font-medium text-content-tertiary-light">
        {text}
      </label>
    </div>
  );
};

export default ProfileEmpty;
