import Input from "../atoms/input";
import Label from "../atoms/label";
import Title from "../atoms/title";
import InputWithLabel from "../molecules/inputWithLabel";

const InfoSub = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="학력" />
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex h-auto w-full">
          <InputWithLabel
            name="학교 이름"
            type="text"
            text=""
            placeholder="학교 이름을 검색해보세요."
            dropdown={true}
          />
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label name="전공" />
          <div className="flex h-auto w-full flex-row gap-4">
            <div className="flex flex-[1_1_75%]">
              <Input type="text" text="" />
            </div>
            <div className="flex flex-[1_1_25%]">
              <Input type="text" text="" dropdown={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSub;
