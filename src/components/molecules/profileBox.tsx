import BoxButton from "../atoms/boxButton";
import ProfileEmpty from "../atoms/profileEmpty";

interface ProfileBoxProps {
  text: string;
  buttonText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileBox = ({ text, buttonText, onClick }: ProfileBoxProps) => {
  return (
    <div className="h-auto w-full rounded-lg border border-border-default-light py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <ProfileEmpty text={text} />
        <BoxButton type="secondaryOutlined" size="medium" onClick={onClick}>
          {buttonText}
        </BoxButton>
      </div>
    </div>
  );
};

export default ProfileBox;
