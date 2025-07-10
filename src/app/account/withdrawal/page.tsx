import WithdrawalContainer from "./components/withdrawalContainer";
import WithdrawalAgreement from "./components/withdrawalAgreement";
import WithdrawalConfirm from "./components/withdrawalConfirm";
import WithdrawalReasons from "./components/withdrawalReasons";
import { ReasonType } from "./type";
import { getWithdrawReasonServer } from "@/lib/api/withdraw/api";

const Withdrawal = async () => {
  const getReasons = await getWithdrawReasonServer();

  const initialReasons =
    getReasons &&
    getReasons.data.reasons.map((reason: ReasonType) => ({
      ...reason,
      checked: false
    }));

  return (
    <section className="flex h-auto w-[560px] max-w-[560px] flex-col gap-10 pb-28 pt-24">
      <WithdrawalContainer title="탈퇴하기 전에 확인해주세요.">
        <span className="typography-body1 font-normal text-content-primary-light dark:text-content-primary-dark">
          필로그램에 등록된 ""님의 모든 정보가 영구적으로 삭제되어 복구할 수
          없어요.
        </span>
      </WithdrawalContainer>
      <WithdrawalReasons initialReasons={initialReasons} />
      <WithdrawalAgreement />
      <WithdrawalConfirm initialReasons={initialReasons} />
    </section>
  );
};

export default Withdrawal;
