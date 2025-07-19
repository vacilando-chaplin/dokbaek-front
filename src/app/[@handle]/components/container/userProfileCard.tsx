import MainPhoto from "../mainPhoto/mainPhoto";
import ProfileActionButtonContainer from "./profileActionButtonContainer";
import ProfileInfoContainer from "./profileInfoContainer";
import ProfileMeta from "./profileMeta";

interface UserProfileCardProps {
  linear: "main" | "sub";
}

const UserProfileCard = ({ linear }: UserProfileCardProps) => {
  return (
    <section
      className={`flex h-full w-full flex-col gap-2 p-8 ${linear === "main" && "border-r-[1px] border-border-default-light dark:border-border-default-dark"}`}
    >
      <MainPhoto />
      <ProfileActionButtonContainer />
      <ProfileMeta />
      <ProfileInfoContainer />
    </section>
  );
};

export default UserProfileCard;
