import { Metadata } from "next";
import LikeProfiles from "./components/likeProfiles";

export const metadata: Metadata = {
  title: "독백 | 좋아요한 프로필",
  description: "내가 좋아요한 배우 프로필 모음",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const Page = () => {
  return (
    <div className="container-max m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <section className="mt-11">
        <p className="mb-6 text-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
          좋아요한 프로필
        </p>
        <LikeProfiles />
      </section>
    </div>
  );
};

export default Page;
