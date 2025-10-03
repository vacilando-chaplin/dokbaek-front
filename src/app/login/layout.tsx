import { Metadata } from "next";

export const metadata: Metadata = {
  title: "독백 | 로그인",
  description: "독백에 로그인하여 배우 섭외 서비스를 이용하세요",
  robots: {
    index: true,
    follow: true
  }
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background-base-light dark:bg-background-base-dark">
      {children}
    </div>
  );
};

export default Layout;
