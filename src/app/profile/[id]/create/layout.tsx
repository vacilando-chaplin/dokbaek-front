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
    ...profileInitData?.data,
    info: {
      ...profileInitData?.data.info,
      name: profileInitData?.data.info?.name ?? "",
      email: profileInitData?.data.info?.email ?? "",
      contact: profileInitData?.data.info?.contact ?? "",
      instagramLink: profileInitData?.data.info?.instagramLink ?? "",
      youtubeLink: profileInitData?.data.info?.youtubeLink ?? "",
      introduction: profileInitData?.data.info?.introduction ?? ""
    }
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu profileId={profileId} />
      <Initializer profileInitData={nullCheckedData}>{children}</Initializer>
      <BottomBar profileId={profileId} />
      {!profileInitData?.hasDraft && <DraftModal profileId={profileId} />}
    </div>
  );
};

export default Layout;
