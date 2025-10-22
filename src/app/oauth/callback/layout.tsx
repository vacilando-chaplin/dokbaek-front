import { Metadata } from "next";

export const metadata: Metadata = {
  title: "독백 | 로그인 처리중",
  description: "로그인을 처리하고 있습니다",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background-base-light dark:bg-background-base-dark">
      {children}
    </main>
  );
};

export default Layout;
