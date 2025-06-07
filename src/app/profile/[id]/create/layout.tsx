import ListMenu from "@/app/profile/[id]/create/components/listMenu";
import BottomBar from "@/app/profile/[id]/create/components/bottomBar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DraftModal from "./components/draftModal";
import { postProfileDraftServer } from "@/lib/api/profile/common/api";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const jwt = cookie.get("jwt")?.value;
  if (!jwt) redirect("/");

  const profileId = Number(cookies().get("loginProfileId")?.value);

  const draftRes = await postProfileDraftServer(profileId);
  const draftData = await draftRes.data.data;
  const draftStatus = draftRes.status;

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu profileId={profileId} />
      {children}
      <BottomBar profileId={profileId} />
      {draftStatus === 200 && (
        <DraftModal profileId={profileId} draftData={draftData} />
      )}
    </div>
  );
};

export default Layout;
