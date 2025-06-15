import HomeButton from "./components/homeButton";

const WithdrawalComplete = () => {
  return (
    <div className="flex h-auto w-full max-w-[560px] flex-col gap-10 py-20">
      <div className="typography-heading2 flex flex-col items-center justify-center font-semibold text-content-primary-light dark:text-content-primary-dark">
        <span>탈퇴가 완료되었습니다.</span>
        <span>그동안 필로그램을 이용해 주셔서 감사합니다.</span>
      </div>
      <HomeButton />
    </div>
  );
};

export default WithdrawalComplete;
