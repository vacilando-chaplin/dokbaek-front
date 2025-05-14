import MypageListItem from "./mypageListItem";

const MypageMainContents = () => {
  return (
    <div className="flex h-auto w-full min-w-[560px] max-w-[560px] flex-col gap-2 rounded-2xl border border-border-default-light bg-background-surface-light px-2 pb-2 pt-5 dark:border-border-default-dark dark:bg-background-base-dark">
      <span className="typography-body3 pl-4 font-semibold text-content-primary-light dark:text-content-primary-dark">
        법적 정보
      </span>
      <div className="h-auto w-full">
        <MypageListItem text="이용약관" icon />
        <MypageListItem text="개인정보 처리방침" icon />
      </div>
    </div>
  );
};

export default MypageMainContents;
