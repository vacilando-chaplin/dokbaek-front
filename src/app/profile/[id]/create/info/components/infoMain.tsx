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
  onSelectGender: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onNumberChange: React.ChangeEventHandler<HTMLInputElement>;
  onBirthChange: React.ChangeEventHandler<HTMLInputElement>;
  onContactChange: React.ChangeEventHandler<HTMLInputElement>;
  onInfoDropdownActive: (name: string, state: boolean) => void;
  onItemClick: (name: string, item: string) => void;
  onSpecialtyFormModalOpen: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteSpecialty: (specialtyId: number) => () => void;
  onBlurInfo: () => void;
}

const InfoMain = ({
  infoInputs,
  infoActives,
  specialties,
  onSelectGender,
  onInputChange,
  onNumberChange,
  onBirthChange,
  onContactChange,
  onInfoDropdownActive,
  onItemClick,
  onSpecialtyFormModalOpen,
  onDeleteSpecialty,
  onBlurInfo
}: InfoMainProps) => {
  const { name, bornYear, height, weight, contact, email, instagram, youtube } =
    infoInputs;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
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
              onBlur={onBlurInfo}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="출생연도" required />
            <SearchDropdown
              size="medium"
              name="bornYear"
              list={yearList}
              value={bornYear}
              active={infoActives.bornYear}
              selected={bornYear}
              maxLength={4}
              placeholder="출생연도를 선택해주세요."
              onClick={onItemClick}
              onActive={onInfoDropdownActive}
              onChange={onBirthChange}
              onSave={onBlurInfo}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="성별" required />
            <div className="typography-body2 flex h-10 w-full flex-row items-center gap-4 rounded-xl border border-border-default-light bg-background-surface-light px-4 font-normal text-content-primary-light dark:border-border-default-dark dark:bg-background-surface-dark dark:text-content-primary-dark">
              <div className="flex h-auto w-auto flex-row gap-2">
                <input
                  type="radio"
                  id="F"
                  name="customRadio"
                  checked={infoInputs.gender === "F"}
                  className="peer hidden"
                  onChange={onSelectGender}
                />
                <label
                  htmlFor="F"
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <span
                    className={`interaction-default flex h-4 w-4 items-center justify-center rounded-full ${infoInputs.gender === "F" ? "border-[4px] border-accent-primary-light dark:border-accent-primary-dark" : "border-[1.5px] border-border-default-light hover:border-[2.5px] hover:border-accent-primary-light dark:border-border-default-dark dark:hover:border-accent-primary-dark"}`}
                  >
                    <span className="bg-white hidden h-2.5 w-2.5 rounded-full peer-checked:block"></span>
                  </span>
                  <span>여성</span>
                </label>
              </div>
              <div className="flex h-auto w-auto flex-row gap-2">
                <input
                  type="radio"
                  id="M"
                  name="customRadio"
                  checked={infoInputs.gender === "M"}
                  className="peer hidden"
                  onChange={onSelectGender}
                />
                <label
                  htmlFor="M"
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <span
                    className={`interaction-default flex h-4 w-4 items-center justify-center rounded-full ${infoInputs.gender === "M" ? "border-[4px] border-accent-primary-light dark:border-accent-primary-dark" : "border-[1.5px] border-border-default-light hover:border-[2.5px] hover:border-accent-primary-light dark:border-border-default-dark dark:hover:border-accent-primary-dark"}`}
                  >
                    <span className="bg-white hidden h-2.5 w-2.5 rounded-full peer-checked:block"></span>
                  </span>
                  <span>남성</span>
                </label>
              </div>
            </div>
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
              onBlur={onBlurInfo}
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
              onBlur={onBlurInfo}
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
              onBlur={onBlurInfo}
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
              onBlur={onBlurInfo}
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
                <Plus
                  width="12"
                  height="12"
                  className="fill-current text-content-primary-light dark:text-content-primary-dark"
                />
                추가/수정
              </BoxButton>
            </div>
            <div className="mt-2 flex h-auto gap-1">
              {specialties.map((item: SpecialtyType) => {
                const { id, specialtyName } = item;
                return (
                  <Chips
                    key={id}
                    text={specialtyName}
                    icon
                    onClick={onDeleteSpecialty(id)}
                  />
                );
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
              onBlur={onBlurInfo}
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
              onBlur={onBlurInfo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoMain;
