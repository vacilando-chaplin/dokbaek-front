import ListMenu from "@/app/profile/[id]/create/components/listMenu";
import BottomBar from "@/app/profile/[id]/create/components/bottomBar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DraftModal from "./components/draftModal";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const jwt = cookie.get("jwt")?.value;
  if (!jwt) redirect("/");

  const profileId = Number(cookies().get("loginProfileId")?.value);

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu profileId={profileId} />
      {children}
      <BottomBar profileId={profileId} />
      <DraftModal profileId={profileId} />
    </div>
  );
};

export default Layout;
