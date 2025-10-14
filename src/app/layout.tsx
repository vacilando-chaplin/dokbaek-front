import type { Metadata } from "next";
import localFont from "next/font/local";
import RecoilRootProvider from "../lib/providers/recoilRootProvider";
import "../styles/globals.css";
import QueryRootProvider from "../lib/providers/queryRootProvider";
import AuthInitializer from "@/lib/providers/authInitializer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "독백 | 아티스트 섭외 플랫폼",
  description: "아티스트 섭외 플랫폼",
  keywords: ["아티스트, 배우, 섭외, 캐스팅, 플랫폼"],
  metadataBase: new URL("https://dokbaek.com"),
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "shortcut icon", url: "/favicon.ico" }
  ],
  openGraph: {
    title: "독백 | 아티스트 섭외 플랫폼",
    description: "아티스트 섭외 플랫폼",
    url: "https://dokbaek.com",
    siteName: "독백",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://dokbaek.com/images/DokbaekOpenGraphImage.png",
        width: 1200,
        height: 630,
        alt: "독백 | 아티스트 섭외 플랫폼"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "독백 | 아티스트 섭외 플랫폼",
    description: "아티스트 섭외 플랫폼",
    images: ["https://dokbaek.com/images/DokbaekOpenGraphImage.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  verification: {
    google: "5Ea2iwbh8ni_RPYUTmjyxaaEOzvmHNsK0"
  },
  other: {
    "naver-site-verification": "e03b1cbc9e244e05b85731941e13b6baab682e9a"
  },
  alternates: {
    types: {
      "application/rss+xml": "https://dokbaek.com/feed.xml"
    }
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
      <Suspense fallback={null}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </Suspense>
      <body className={`${pretendard.className}`}>
        <QueryRootProvider>
          <RecoilRootProvider>
            <AuthInitializer />
            <main>{children}</main>
          </RecoilRootProvider>
        </QueryRootProvider>
      </body>
    </html>
  );
}
