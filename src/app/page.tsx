import ToastClientWrapper from "./home/components/toastClientWrapper";
import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";
import { cookies } from "next/headers";
import { getProfileMeServer } from "@/lib/api/common/api";
import LandingMain from "./home/components/landingMain";
import HomeContainer from "./home/components/homeContainer";
import HomeBanner from "./home/components/homeBanner";

const Home = async () => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const myProfileId = jwt ? await getProfileMeServer() : null;

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      <ToastClientWrapper />
      <HomeContainer>
        <HomeBanner />
        <LandingMain myProfileId={myProfileId} />
      </HomeContainer>
      <Footer />
    </div>
  );
};

export default Home;
