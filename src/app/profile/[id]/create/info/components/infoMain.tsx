import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import Title from "@/components/atoms/title";
import SearchDropdown from "@/components/molecules/searchDropdown";
import { yearList } from "@/lib/data";
import { InfoActiveType, InfoInputType, SpecialtyType } from "../types";
import BoxButton from "@/components/atoms/boxButton";
import Plus from "../../../../../../../public/icons/Plus.svg";
import Chips from "@/components/atoms/chips";
interface InfoMainProps {
  infoInputs: InfoInputType;
  infoActives: InfoActiveType;
  specialties: SpecialtyType[];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onNumberChange: React.ChangeEventHandler<HTMLInputElement>;
  onBirthChange: React.ChangeEventHandler<HTMLInputElement>;
  onContactChange: React.ChangeEventHandler<HTMLInputElement>;
  onInfoDropdownActive: (name: string, state: boolean) => void;
  onItemClick: (name: string, item: string) => void;
  onSpecialtyFormModalOpen: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteSpecialty: (specialtyId: number) => () => void;
}

const InfoMain = ({
  infoInputs,
  infoActives,
  specialties,
  onInputChange,
  onNumberChange,
  onBirthChange,
  onContactChange,
  onInfoDropdownActive,
  onItemClick,
  onSpecialtyFormModalOpen,
  onDeleteSpecialty
}: InfoMainProps) => {
  const {
    name,
    birth,
    height,
    weight,
    contact,
    email,
    specialty,
    instagram,
    youtube
  } = infoInputs;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="기본 정보" />
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="이름" required />
            <TextInput
              type="text"
              size="medium"
              name="name"
              value={name}
              maxLength={10}
              placeholder="이름을 입력해주세요."
              onChange={onInputChange}
            />
          </div>
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
              placeholder="출생연도를 선택해주세요."
              onClick={onItemClick}
              onActive={onInfoDropdownActive}
              onChange={onBirthChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="키" />
            <TextInput
              type="text"
              size="medium"
              name="height"
              value={height}
              parameter="cm"
              maxLength={3}
              placeholder="0"
              onChange={onNumberChange}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="몸무게" />
            <TextInput
              type="text"
              size="medium"
              name="weight"
              value={weight}
              parameter="kg"
              maxLength={3}
              placeholder="0"
              onChange={onNumberChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="전화번호" required />
            <TextInput
              type="tel"
              size="medium"
              name="contact"
              value={contact}
              maxLength={13}
              onChange={onContactChange}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="이메일" />
            <TextInput
              type="email"
              size="medium"
              name="email"
              value={email}
              maxLength={40}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full">
          <div className="flex w-full flex-col">
            <Label label="특기" />
            <div className="flex h-auto w-full flex-col gap-1">
              <BoxButton
                type="secondaryOutlined"
                size="medium"
                onClick={onSpecialtyFormModalOpen}
              >
                <Plus width="12" height="12" fill="#212529" />
                추가/수정
              </BoxButton>
            </div>
            <div className="flex h-auto gap-1 mt-2">
              {specialties.map((item: SpecialtyType) => {
                const { id, specialtyName } = item;
                return (
                  <Chips key={id} text={specialtyName} icon onClick={onDeleteSpecialty(id)}/>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="링크" />
          <div className="flex h-auto w-full flex-col gap-1">
            <TextInput
              type="link"
              size="medium"
              name="instagram"
              icon="instagram"
              value={instagram}
              maxLength={300}
              placeholder="https://"
              onChange={onInputChange}
            />
            <TextInput
              type="link"
              size="medium"
              name="youtube"
              icon="youtube"
              value={youtube}
              maxLength={300}
              placeholder="https://"
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoMain;
