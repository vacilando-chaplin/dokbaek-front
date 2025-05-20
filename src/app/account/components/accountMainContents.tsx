import AccountContainer from "./accountContainer";
import AccountListItem from "./accountListItem";

const AccountMainContents = () => {
  return (
    <AccountContainer>
      <span className="typography-body3 pl-4 font-semibold text-content-primary-light dark:text-content-primary-dark">
        법적 정보
      </span>
      <div className="h-auto w-full">
        <AccountListItem text="이용약관" icon />
        <AccountListItem text="개인정보 처리방침" icon />
      </div>
    </AccountContainer>
  );
};

export default AccountMainContents;
