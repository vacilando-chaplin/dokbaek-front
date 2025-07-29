import { cookies } from "next/headers";
import Toast from "@/components/atoms/toast";
import TopNavigation from "@/components/organisms/topNavigation";
import HandleInitializer from "./components/provider/initializer";
import { notFound } from "next/navigation";
import { getFilmoCategories, getProfileByHandleId } from "./api";
import HandleNameCreatePage from "./handleNameCreatePage";
import { profileInit } from "@/lib/data";

const Layout = async ({
  params,
  children
}: {
  params: { "@handle": string };
  children: React.ReactNode;
}) => {
  const loginProfileId = cookies().get("loginProfileId")?.value;
  const rawHandle = params["@handle"];
  const handleName = decodeURIComponent(rawHandle);
  const categoryRes = await getFilmoCategories();
  const filmoCategories = categoryRes.data;

  if (handleName === "@new") {
    return (
      <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
        <Toast kind="info" fullWidth={false} placement="top" />
        <TopNavigation />
        <HandleNameCreatePage />
      </div>
    );
  }

  const res = await getProfileByHandleId(handleName);
  const profileExists = res?.status !== 404;

  if (!profileExists) {
    notFound();
  }

  const profileData = profileExists ? res?.data.data : profileInit;
  const isMyProfile = loginProfileId === profileData?.id;

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
