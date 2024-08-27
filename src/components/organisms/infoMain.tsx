import Title from "../atoms/title";
import InputWithLabel from "../molecules/inputWithLabel";

const InfoMain = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="기본 정보" />
      <div className="flex h-auto w-full gap-4">
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            name="이름"
            required={true}
            placeholder="이름을 입력해주세요."
          />
        </div>
      </div>
    </section>
  );
};

export default InfoMain;
