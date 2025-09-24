import { Metadata } from "next";
import HomeButton from "./components/homeButton";

export const metadata: Metadata = {
  title: "독백 | 회원 탈퇴 완료",
  description: "회원 탈퇴가 완료되었습니다"
};

const WithdrawalComplete = () => {
  return (
    <div className="flex h-auto w-full max-w-[560px] flex-col gap-10 py-20">
      <div className="typography-heading2 flex flex-col items-center justify-center font-semibold text-content-primary-light dark:text-content-primary-dark">
        <span>탈퇴가 완료되었습니다.</span>
        <span>그동안 독백을 이용해 주셔서 감사합니다.</span>
      </div>
      <HomeButton />
    </div>
  );
};

export default WithdrawalComplete;
