import ToastClientWrapper from "./home/components/toastClientWrapper";
import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";
import { cookies } from "next/headers";
import { getProfileMeServer } from "@/lib/api/common/api";
import LandingMain from "./home/components/landingMain";
import LoginModal from "@/components/organisms/loginModal";
import HomeContainer from "./home/components/container/homeContainer";
import HomeBanner from "./home/components/container/homeBanner";

const Home = async () => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const myProfileData = jwt ? await getProfileMeServer() : null;

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      <ToastClientWrapper />
      <LoginModal />
      <HomeContainer>
        <HomeBanner myProfileData={myProfileData} />
        <LandingMain myProfileId={myProfileData?.id} />
      </HomeContainer>
      <Footer />
    </div>
  );
};

export default Home;
