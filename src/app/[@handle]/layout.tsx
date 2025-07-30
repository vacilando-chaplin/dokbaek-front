import { cookies } from "next/headers";
import Toast from "@/components/atoms/toast";
import TopNavigation from "@/components/organisms/topNavigation";
import HandleInitializer from "./components/provider/initializer";
import { notFound } from "next/navigation";
import {
  getFilmoCategories,
  getProfileByHandleId,
  getProfileHandleExists
} from "./api";
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

  // 회원 가입 후 프로필 ID 존재 여부 확인, 프로필 ID가 없다면 프로필 ID 생성 페이지 보여줌
  if (handleName === "@new") {
    return (
      <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
        <Toast kind="info" fullWidth={false} placement="top" />
        <TopNavigation />
        <HandleNameCreatePage />
      </div>
    );
  }

  // 프로필 ID 존재 여부 확인
  const handleRes = await getProfileHandleExists(handleName);

  // 404 상태이거나 exists가 false인 경우 notFound 호출
  if (handleRes.status === 404 || !handleRes.data.data.exists) {
    notFound();
  }

  const categoryRes = await getFilmoCategories();
  const filmoCategories = categoryRes.data;

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
