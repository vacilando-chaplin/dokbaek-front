import ListMenu from "@/app/profile/[id]/create/components/listMenu";
import BottomBar from "@/app/profile/[id]/create/components/bottomBar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DraftModal from "./components/draftModal";
import { getProfileDraftServer } from "@/lib/api/profile/common/api";
import Initializer from "./components/Initializer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const jwt = cookie.get("jwt")?.value;
  if (!jwt) redirect("/");

  const profileId = Number(cookies().get("loginProfileId")?.value);

  const profileInitData = await getProfileDraftServer(profileId);
  const nullCheckedData = {
    ...profileInitData,
    info: {
      ...profileInitData.info,
      name: profileInitData.info.name ?? "",
      email: profileInitData.info.email ?? "",
      contact: profileInitData.info.contact ?? "",
      instagramLink: profileInitData.info.instagramLink ?? "",
      youtubeLink: profileInitData.info.youtubeLink ?? "",
      introduction: profileInitData.info.introduction ?? ""
    }
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu profileId={profileId} />
      <Initializer profileInitData={nullCheckedData}>{children}</Initializer>
      <BottomBar profileId={profileId} />
      <DraftModal profileId={profileId} />
    </div>
  );
};

export default Layout;
