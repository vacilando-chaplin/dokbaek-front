import LandingContainer from "./landing/components/landingContainer";
import ToastClientWrapper from "./landing/components/toastClientWrapper";
import { Suspense } from "react";
import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";

const Home = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      <ToastClientWrapper />
      <LandingContainer />
      <Footer />
    </div>
  );
};

export default Home;
