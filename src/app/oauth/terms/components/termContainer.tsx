import TermForm from "./termForm";

const TermContainer = () => {
  return (
    <section className="flex h-auto w-[487px] flex-col items-center justify-center gap-20 rounded-[40px] border border-border-default-light bg-background-surface-light p-20 dark:border-border-default-dark dark:bg-background-surface-dark">
      <div className="typography-heading2 flex flex-col items-center font-semibold text-content-primary-light dark:text-content-primary-dark">
        <span>독백 이용을 위해</span>
        <span>동의가 필요해요.</span>
      </div>
      <TermForm />
    </section>
  );
};

export default TermContainer;
