import { cookies } from "next/headers";
import Toast from "@/components/atoms/toast";
import HandleInitializer from "./components/provider/initializer";
import { notFound } from "next/navigation";
import { getFilmoCategories, getProfileByHandleId } from "./api";
import HandleNameCreatePage from "./handleNameCreatePage";
import { profileInit } from "@/lib/data";
import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";

const Layout = async ({
  params,
  children
}: {
  params: { "@handle": string };
  children: React.ReactNode;
}) => {
  const loginProfileId = Number(cookies().get("loginProfileId")?.value);
  const rawHandle = params["@handle"];
  const handleName = decodeURIComponent(rawHandle).substring(1);

  // 회원 가입 후 프로필 ID 존재 여부 확인, 프로필 ID가 없다면 프로필 ID 생성 페이지 보여줌
  if (handleName === "@new") {
    return (
      <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
        <Toast kind="info" fullWidth={false} placement="top" />
        <Suspense fallback={<></>}>
          <TopNavigation />
        </Suspense>
        <HandleNameCreatePage />
      </div>
    );
  }

  const res = await getProfileByHandleId(handleName);

  if (!res) {
    notFound();
  }

  const categoryRes = await getFilmoCategories();
  const filmoCategories = categoryRes.data;

  const profileData = res ? res?.data : profileInit;
  const isMyProfile = loginProfileId === profileData?.id;

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
      <Toast kind="info" fullWidth={false} placement="top" />
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
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
