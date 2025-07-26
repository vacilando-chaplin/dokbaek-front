import { cookies } from "next/headers";
import Toast from "@/components/atoms/toast";
import TopNavigation from "@/components/organisms/topNavigation";
import HandleInitializer from "./components/provider/initializer";
import { notFound } from "next/navigation";
import { getProfileOtherUser } from "@/lib/api";
import { getFilmoCategories } from "./api";

const Layout = async ({
  params,
  children
}: {
  params: { "@handle": string };
  children: React.ReactNode;
}) => {
  // 로그인 프로필 Id 핸들네임으로 교체 해야 함
  const loginProfileId = cookies().get("loginProfileId")?.value;
  const handleName = params["@handle"];
  // const isMyProfile = loginProfileId === handleName;

  // const res = await getProfile(handleName);
  // const profileData = res.data;

  // if (res.status === 404) {
  //   notFound();
  // }

  const res = await getProfileOtherUser(Number(loginProfileId));
  const profileData = res.data;
  const isMyProfile = true;

  const categoryRes = await getFilmoCategories();
  const filmoCategories = categoryRes.data;

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
      <Toast kind="info" fullWidth={false} placement="top" />
      <TopNavigation />
      <HandleInitializer
        profileData={profileData}
        isMyProfile={isMyProfile}
        handleName={handleName}
        filmoCategories={filmoCategories}
      >
        {children}
      </HandleInitializer>
    </div>
  );
};

export default Layout;
