import type { Metadata } from "next";
import localFont from "next/font/local";
import RecoilRootProvider from "./recoilRootProvider";
import "../styles/globals.css";
import Script from "next/script";

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
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js"
            integrity="sha384-kLbo2SvoNtOFiniJ1EQ9o2iDA8i3xp+O6Cns+L5cd4RsOJfl+43z5pvieT2ayq3C"
            crossOrigin="anonymous"
          ></Script>
          <main>{children}</main>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
