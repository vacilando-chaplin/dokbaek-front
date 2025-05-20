import AccountMainContents from "./components/accountMainContents";
import AccountSubContents from "./components/accountSubContents";

const Account = () => {
  // name 로그인 시 가져와야 함
  return (
    <section className="flex h-auto min-w-[560px] max-w-[560px] flex-col items-center justify-center gap-10 pb-28 pt-24">
      <h1 className="typography-heading2 font-semibold">""님, 안녕하세요</h1>
      <div className="flex flex-col gap-2">
        <AccountMainContents />
        <AccountSubContents />
      </div>
    </section>
  );
};

export default Account;
