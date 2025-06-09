import ProfileSpecialtyFormModal from "../../components/profileSpecialtyFormModal";
import PersonalInfo from "./components/personalInfo";
import { cookies } from "next/headers";
import Introduction from "./components/introduction";
import Education from "./components/education";

const Info = () => {
  const profileId = Number(cookies().get("loginProfileId")?.value);

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <PersonalInfo profileId={profileId} />
      <Education profileId={profileId} />
      <Introduction profileId={profileId} />
      <ProfileSpecialtyFormModal type="add" profileId={profileId} />
    </div>
  );
};

export default Info;
