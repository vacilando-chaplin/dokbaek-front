import WithdrawalContainer from "./components/withdrawalContainer";
import WithdrawalCheckbox from "./components/withdrawalCheckbox";
import BoxButton from "@/components/atoms/boxButton";
import WithdrawalTerms from "./components/withdrwalTerms";

const Withdrawal = () => {
  return (
    <section className="flex h-auto w-full min-w-[560px] max-w-[560px] flex-col gap-10 pb-28 pt-24">
      <WithdrawalContainer title="탈퇴하기 전에 확인해주세요.">
        <span className="typography-body1 font-normal text-content-primary-light dark:text-content-primary-dark">
          필로그램에 등록된 김범석님의 모든 정보가 영구적으로 삭제되어 복구할 수
          없어요.
        </span>
      </WithdrawalContainer>
      <WithdrawalTerms />
      <WithdrawalCheckbox label="회원 탈퇴를 진행하여 필로그램에 귀속된 모든 정보를 삭제하는 데 동의합니다." />
      <div className="flex h-auto w-full flex-row gap-2">
        <BoxButton type="secondaryOutlined" size="large" width="full">
          회원 탈퇴 취소
        </BoxButton>
        <BoxButton type="primary" size="large" width="full" disabled={true}>
          회원 탈퇴
        </BoxButton>
      </div>
    </section>
  );
};

export default Withdrawal;
