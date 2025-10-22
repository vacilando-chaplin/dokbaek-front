import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";
import { cookies } from "next/headers";
import { getProfileMeServer } from "@/lib/api/common/api";
import LoginModal from "@/components/organisms/loginModal";
import HomeContainer from "./home/components/container/homeContainer";
import HomeBanner from "./home/components/container/homeBanner";
import HomeProfileList from "./home/components/container/homeProfileList";
import ToastClientWrapper from "./home/components/wrapper/toastClientWrapper";
import { getProfileShowcase } from "./home/api";

const Home = async () => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const profileRes = jwt ? await getProfileMeServer() : null;
  const myProfileData = profileRes?.data.data ?? null;

  const page = 0;
  const size = 20;
  const res = await getProfileShowcase(page, size);
  const profileShowcase = res.content || [];

  const initialProfileShowcaseData = {
    profiles: profileShowcase,
    currentPage: res.page || 0,
    totalElements: res.totalElements || 0,
    totalPages: res.totalPages || 0,
    hasNext: res.hasNext,
    isLoading: false
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      <ToastClientWrapper />
      <LoginModal />
      <HomeContainer>
        <HomeBanner myProfileData={myProfileData} />
        <HomeProfileList
          myProfileId={myProfileData?.id}
          profileShowcase={initialProfileShowcaseData}
        />
      </HomeContainer>
      <Footer />
    </div>
  );
};

export default Home;
