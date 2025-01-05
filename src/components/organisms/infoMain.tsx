import { yearList } from "@/data/data";
import { InfoActiveType, InfoInputType } from "@/types/types";
import Input from "../atoms/input";
import Label from "../atoms/label";
import Title from "../atoms/title";
import InputWithLabel from "../molecules/inputWithLabel";
import SearchDropdown from "../molecules/searchDropdown";

interface InfoMainProps {
  infoInputs: InfoInputType;
  infoActives: InfoActiveType;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onNumberChange: React.ChangeEventHandler<HTMLInputElement>;
  onBirthChange: React.ChangeEventHandler<HTMLInputElement>;
  onContactChange: React.ChangeEventHandler<HTMLInputElement>;
  onInfoDropdownActive: (name: string, state: boolean) => void;
  onItemClick: (name: string, item: string) => void;
}

const InfoMain = ({
  infoInputs,
  infoActives,
  onInputChange,
  onNumberChange,
  onBirthChange,
  onContactChange,
  onInfoDropdownActive,
  onItemClick
}: InfoMainProps) => {
  const {
    name,
    birth,
    height,
    weight,
    contact,
    email,
    speciality,
    instagram,
    youtube
  } = infoInputs;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="기본 정보" />
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            label="이름"
            type="text"
            required={true}
            placeholder="이름을 입력해주세요."
            maxLength={10}
            name="name"
            value={name}
            onChange={onInputChange}
          />
          <div className="flex w-full flex-col">
            <Label label="출생연도" required />
            <SearchDropdown
              size="medium"
              name="birth"
              list={yearList}
              value={birth}
              active={infoActives.birth}
              selected={birth}
              maxLength={4}
              onClick={onItemClick}
              onActive={onInfoDropdownActive}
              onChange={onBirthChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            label="키"
            type="text"
            placeholder="0"
            parameter="cm"
            maxLength={3}
            name="height"
            value={height}
            onChange={onNumberChange}
          />
          <InputWithLabel
            label="몸무게"
            type="text"
            placeholder="0"
            parameter="kg"
            maxLength={3}
            name="weight"
            value={weight}
            onChange={onNumberChange}
          />
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            label="전화번호"
            type="tel"
            required={true}
            maxLength={13}
            name="contact"
            value={contact}
            onChange={onContactChange}
          />
          <InputWithLabel
            label="이메일"
            type="email"
            maxLength={40}
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className="flex h-auto w-full">
          <InputWithLabel
            label="특기"
            type="text"
            placeholder="ex) 영어, 중국어, 피아노, 1종 면허, 사투리, 댄스"
            maxLength={20}
            name="speciality"
            value={speciality}
            onChange={onInputChange}
          />
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="링크" />
          <div className="flex h-auto w-full flex-col gap-1">
            <Input
              type="link"
              placeholder="인스타그램 링크를 입력해주세요."
              icon="instagram"
              maxLength={300}
              name="instagram"
              value={instagram}
              onChange={onInputChange}
            />
            <Input
              type="link"
              placeholder="유튜브 채널 링크를 입력해주세요."
              icon="youtube"
              maxLength={300}
              name="youtube"
              value={youtube}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoMain;
