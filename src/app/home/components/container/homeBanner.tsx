import { ProfileDraftDataType } from "@/app/[@handle]/edit/types";
import HomeBannerButton from "../button/homeBannerButton";

interface HomeBannerProps {
  myProfileData: ProfileDraftDataType | null;
}

const HomeBanner = ({ myProfileData }: HomeBannerProps) => {
  return (
    <section className="relative mx-auto mt-10 flex h-60 w-full max-w-[1272px] flex-row items-center justify-between rounded-[40px] bg-[linear-gradient(to_bottom,#000000,#000003)] px-[100px]">
      <h1 className="text-display font-bold leading-[100%] tracking-[-1%] text-static-white">
        프로필은 독백에서
      </h1>
      <HomeBannerButton myProfileData={myProfileData} />
    </section>
  );
};

export default HomeBanner;
