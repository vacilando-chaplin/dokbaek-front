import Input from "../atoms/input";
import Label from "../atoms/label";
import Title from "../atoms/title";
import InputWithLabel from "../molecules/inputWithLabel";

const InfoMain = () => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="기본 정보" />
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            name="이름"
            type="text"
            text=""
            required={true}
            placeholder="이름을 입력해주세요."
          />
          <InputWithLabel
            name="출생연도"
            type="text"
            text=""
            required={true}
            placeholder="출생연도를 선택해주세요."
            dropdown={true}
          />
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            name="키"
            type="text"
            text=""
            placeholder="0"
            parameter="cm"
          />
          <InputWithLabel
            name="몸무게"
            type="text"
            text=""
            placeholder="0"
            parameter="kg"
          />
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel name="전화번호" type="tel" text="" required={true} />
          <InputWithLabel name="이메일" type="email" text="" />
        </div>
        <div className="flex h-auto w-full">
          <InputWithLabel
            name="특기"
            type="text"
            text=""
            placeholder="ex) 영어, 중국어, 피아노, 1종 면허, 사투리, 댄스"
          />
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label name="링크" />
          <div className="flex h-auto w-full flex-col gap-1">
            <Input
              type="link"
              text=""
              placeholder="인스타그램 링크를 입력해주세요."
              icon="/icons/Instagram.svg"
            />
            <Input
              type="link"
              text=""
              placeholder="유튜브 채널 링크를 입력해주세요."
              icon="/icons/Youtube.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoMain;
