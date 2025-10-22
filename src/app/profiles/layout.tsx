import Footer from "@/components/organisms/footer";
import TopNavigation from "@/components/organisms/topNavigation";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "독백 | 배우 찾기",
  description: "다양한 배우와 아티스트를 검색하고 탐색하세요",
  keywords: "배우, 아티스트, 검색, 캐스팅, 섭외",
  openGraph: {
    title: "독백 | 배우 찾기",
    description: "다양한 배우와 아티스트를 검색하고 탐색하세요",
    url: "https://dokbaek.com/profiles",
    siteName: "독백",
    locale: "ko_KR",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
