import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DraftModal from "./components/draftModal";
import { getProfileDraftServer } from "@/lib/api/profile/common/api";
import Initializer from "./components/Initializer";
import ListMenu from "./components/listMenu";
import BottomBar from "./components/bottomBar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const jwt = cookie.get("jwt")?.value;
  if (!jwt) redirect("/");

  const profileId = Number(cookies().get("loginProfileId")?.value);

  const profileInitData = await getProfileDraftServer(profileId);
  const profileData = profileInitData?.data?.data;
  const nullCheckedData = {
    ...profileData,
    info: {
      ...profileData?.info,
      name: profileData?.info?.name ?? "",
      email: profileData?.info?.email ?? "",
      contact: profileData?.info?.contact ?? "",
      instagramLink: profileData?.info?.instagramLink ?? "",
      youtubeLink: profileData?.info?.youtubeLink ?? "",
      introduction: profileData?.info?.introduction ?? ""
    }
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu profileId={profileId} />
      <Initializer profileInitData={nullCheckedData}>{children}</Initializer>
      <BottomBar profileId={profileId} />
      {profileInitData?.hasDraft && <DraftModal profileId={profileId} />}
    </div>
  );
};

export default Layout;
