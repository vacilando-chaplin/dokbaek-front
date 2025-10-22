import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  getProfileDraftServer,
  postProfileDraftServer
} from "@/lib/api/profile/common/api";
import Initializer from "./components/Initializer";
import ListMenu from "./components/listMenu";
import BottomBar from "./components/bottomBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const jwt = cookie.get("jwt")?.value;
  if (!jwt) redirect("/");

  const profileId = Number(cookies().get("loginProfileId")?.value);

  const draftResponse = await getProfileDraftServer(profileId);
  const originalDraftExists = draftResponse?.hasDraft ?? false;

  let profileInitData;

  if (originalDraftExists) {
    profileInitData = draftResponse;
  } else {
    profileInitData = await postProfileDraftServer(profileId);
  }

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
      <ListMenu />
      <Initializer profileId={profileId} profileInitData={nullCheckedData}>
        {children}
      </Initializer>
      <BottomBar profileId={profileId} />
    </div>
  );
};

export default Layout;
