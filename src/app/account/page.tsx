import { getTerms } from "@/lib/api";
import AccountMenu from "./components/accountMenu";
import AccountPolicies from "./components/accountPolicies";

const Account = async () => {
  // name 로그인 시 가져와야 함

  const policies = await getTerms();

  return (
    <section className="flex h-auto min-w-[560px] max-w-[560px] flex-col items-center justify-center gap-10 pb-28 pt-24">
      <h1 className="typography-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
        배우님, 안녕하세요
      </h1>
      <div className="flex flex-col gap-2">
        <AccountPolicies policies={policies.data.terms} />
        <AccountMenu />
      </div>
    </section>
  );
};

export default Account;
