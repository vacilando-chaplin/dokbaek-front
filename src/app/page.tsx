import LandingContainer from "./landing/components/landingContainer";
import ToastClientWrapper from "./landing/components/toastClientWrapper";
import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";
import { cookies } from "next/headers";
import { getProfileMeServer } from "@/lib/api/common/api";

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
      <LandingContainer myProfileId={myProfileId?.id} />
      <Footer />
    </div>
  );
};

export default Home;
