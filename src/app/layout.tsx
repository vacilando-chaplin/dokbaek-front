import type { Metadata } from "next";
import localFont from "next/font/local";
import RecoilRootProvider from "./recoilRootProvider";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "filogram",
  description: "배우 프로필 제작 서비스"
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <RecoilRootProvider>
          <main>{children}</main>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
