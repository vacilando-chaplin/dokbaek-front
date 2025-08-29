import { cookies } from "next/headers";
import Toast from "@/components/atoms/toast";
import HandleInitializer from "./components/provider/initializer";
import { notFound } from "next/navigation";
import { getFilmoCategories, getProfileByHandleId } from "./api";
import { profileInit } from "@/lib/data";
import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";
import { Metadata } from "next";

export const generateMetadata = async ({
  params
}: {
  params: { "@handle": string };
}): Promise<Metadata> => {
  const rawHandle = params["@handle"];
  const handleName = decodeURIComponent(rawHandle).substring(1);

  try {
    const res = await getProfileByHandleId(handleName);

    if (!res || !res.data) {
      return {
        title: "존재하지 않는 프로필 입니다.",
        description: "존재하지 않는 배우의 프로필 입니다."
      };
    }

    const profileData = res.data;
    const profileName = profileData.info.name;
    const profileImage =
      profileData.mainPhotoPath || "/images/LogoHorizontalDokBaek.png";

    return {
      title: `${profileName}님의 프로필`,
      description: `${profileName}님의 프로필을 확인하세요.`,
      openGraph: {
        title: `${profileName}님의 프로필`,
        description: `${profileName}님의 프로필을 확인하세요.`,
        url: `https://dokbaek.com/@${handleName}`,
        siteName: "dokbaek",
        images: [
          {
            url: profileImage,
            width: 1200,
            height: 630,
            alt: `${profileName}님의 프로필 이미지`
          }
        ],
        locale: "ko_KR",
        type: "profile"
      },
      twitter: {
        card: "summary_large_image",
        title: `${profileName}님의 프로필`,
        description: `${profileName}님의 프로필을 확인하세요.`,
        images: [profileImage]
      },
      // 공개 프로필일 때의 웹 크롤링 설정
      robots: {
        index: true,
        follow: true
      }
    };
  } catch (error) {
    return {
      title: "배우님의 정보를 불러올 수 없는 프로필 입니다.",
      description: "배우님의 프로필을 불러오는 도중 오류가 발생했어요.",
      robots: {
        index: false,
        follow: false
      }
    };
  }
};

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
