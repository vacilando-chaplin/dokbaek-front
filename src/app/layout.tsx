import type { Metadata } from "next";
import localFont from "next/font/local";
import RecoilRootProvider from "./recoilRootProvider";
import "../styles/globals.css";
import QueryRootProvider from "./queryRootProvider";

export const metadata: Metadata = {
  title: "filogram",
  description: "배우 프로필 제작 서비스",
  icons: {
    icon: "/icons/Logo.svg"
  }
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} bg-background-surface-light dark:bg-background-surface-dark`}
    >
      <body className={`${pretendard.className}`}>
        <QueryRootProvider>
          <RecoilRootProvider>
            <main>{children}</main>
          </RecoilRootProvider>
        </QueryRootProvider>
      </body>
    </html>
  );
}
