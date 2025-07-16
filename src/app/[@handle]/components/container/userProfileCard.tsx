import MainPhoto from "../mainPhoto/mainPhoto";
import MainPhotoCropModal from "../mainPhoto/mainPhotoCropModal";
import MainPhotoDeleteModal from "../mainPhoto/mainPhotoDeleteModal";

interface UserProfileCardProps {
  linear: "main" | "sub";
}

const UserProfileCard = ({ linear }: UserProfileCardProps) => {
  return (
    <section
      className={`flex h-full w-full flex-col gap-2 p-8 ${linear === "main" && "border-r-[1px] border-border-default-light dark:border-border-default-dark"}`}
    >
      <MainPhoto />
      <MainPhotoCropModal />
      <MainPhotoDeleteModal />
    </section>
  );
};

export default UserProfileCard;
