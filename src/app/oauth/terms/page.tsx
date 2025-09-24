import { Suspense } from "react";
import TermContainer from "./components/termContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "독백 | 회원가입",
  description: "독백에 가입하여 배우 섭외 플랫폼을 이용하세요",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Terms = () => {
  return (
    <Suspense fallback={<div></div>}>
      <TermContainer />
    </Suspense>
  );
};

export default Terms;
