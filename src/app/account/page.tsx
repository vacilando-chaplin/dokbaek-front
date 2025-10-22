import { getTerms } from "@/lib/api";
import AccountMenu from "./components/accountMenu";
import AccountPolicies from "./components/accountPolicies";
import { Metadata } from "next";
import { getProfileMeServer } from "@/lib/api/common/api";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "독백 | 계정 설정",
  description: "계정 정보 및 설정 관리"
};

const Account = async () => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const policies = await getTerms();

  const res = jwt ? await getProfileMeServer() : null;
  const name = res?.data.data.info.name ?? "배우";

  return (
    <section className="flex h-auto min-w-[560px] max-w-[560px] flex-col items-center justify-center gap-10 pb-28 pt-24">
      <h1 className="typography-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
        {name}님, 안녕하세요
      </h1>
      <div className="flex flex-col gap-2">
        <AccountPolicies policies={policies.data.terms} />
        <AccountMenu />
      </div>
    </section>
  );
};

export default Account;
