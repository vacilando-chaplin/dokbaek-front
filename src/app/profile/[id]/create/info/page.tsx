"use client";

import { getSchoolName, putInfo } from "@/api/api";
import InfoMain from "@/components/organisms/infoMain";
import InfoSub from "@/components/organisms/infoSub";
import InfoThird from "@/components/organisms/infoThird";
import { defaultId, infoRequired, jwt, stepperInit } from "@/data/atom";
import {
  educationEngList,
  educationList,
  infoActiveInit,
  infoInputInit
} from "@/data/data";
import { useDebounce } from "@/hooks/hooks";
import { SchoolType } from "@/types/types";
import { contactFormat, setOnlyNumber } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Info = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const stepper = useRecoilValue(stepperInit);

  const [infoInputs, setInfoInputs] = useState(infoInputInit);
  const [infoActives, setInfoActives] = useState(infoActiveInit);
  const [schoolList, setSchoolList] = useState<string[]>([]);

  const [required, setRequired] = useRecoilState(infoRequired);

  useEffect(() => {
    setRequired({ ...required, name: infoInputs.name });
  }, [infoInputs.name]);

  useEffect(() => {
    setRequired({ ...required, birth: infoInputs.birth });
  }, [infoInputs.birth]);

  useEffect(() => {
    setRequired({ ...required, contact: infoInputs.contact });
  }, [infoInputs.contact]);

  // 내 정보 입력(숫자만 입력 가능한 인풋 제외)
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoInputs({
      ...infoInputs,
      [name]: value
    });
  };

  // 키, 몸무게 입력(숫자만 입력 가능하게)
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
  };

  // 출생연도 입력(숫자만 입력 가능하게)
  const onBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
    if (value && !infoActives.birth) {
      setInfoActives({ ...infoActives, [name]: true });
    }
  };

  // 전화번호 입력(전화번호 포맷으로 변경)
  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setInfoInputs({ ...infoInputs, [name]: inputContact });
  };

  // 학교 검색
  const onSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoInputs({
      ...infoInputs,
      [name]: value
    });
    if (value && !infoActives.school) {
      setInfoActives({ ...infoActives, [name]: true });
    }
  };

  // 드랍다운 수동 액티브
  const onInfoDropdownActive = (name: string, state: boolean) => {
    setInfoActives({ ...infoActives, [name]: !state });
  };

  // 드랍다운 아이템 클릭
  const onItemClick = (name: string, item: string) => {
    setInfoInputs({ ...infoInputs, [name]: item });
  };

  // 학교검색 딜레이 적용(0.5초)
  const debounceSearch = useDebounce(infoInputs.school, 500);

  useEffect(() => {
    const getSearchSchool = async (name: string) => {
      const data = await getSchoolName(name);
      const filteredSchoolName = data.map(
        (school: SchoolType) => school.schoolName
      );
      setSchoolList(filteredSchoolName);
    };
    getSearchSchool(debounceSearch);
  }, [debounceSearch]);

  // 내 정보 탭에서 다른 탭으로 이동 시 내 정보 업데이트

  useEffect(() => {
    const onStepper = async () => {
      if (!token) {
        return;
      }
      if (stepper !== 0) {
        const educationIndex = educationList.indexOf(infoInputs.education);
        const educationStatus = educationEngList[educationIndex];

        const infoData = {
          status: "PUBLIC",
          info: {
            name: infoInputs.name,
            bornYear: Number(infoInputs.birth),
            height: Number(infoInputs.height),
            weight: Number(infoInputs.weight),
            email: infoInputs.email,
            contact: infoInputs.contact,
            speciality: infoInputs.specialty,
            instagramLink: infoInputs.instagram,
            youtubeLink: infoInputs.youtube,
            introduction: infoInputs.introduction
          },
          education: [
            {
              school: {
                name: infoInputs.school,
                schoolType: "",
                schoolGubun: ""
              },
              major: infoInputs.major,
              status: educationStatus
            }
          ]
        };
        try {
          await putInfo(userId, infoData, token);
        } catch (error) {
          throw error;
        }
      }
    };
    onStepper();
  }, [stepper]);

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <InfoMain
        infoInputs={infoInputs}
        infoActives={infoActives}
        onInputChange={onInputChange}
        onNumberChange={onNumberChange}
        onBirthChange={onBirthChange}
        onContactChange={onContactChange}
        onInfoDropdownActive={onInfoDropdownActive}
        onItemClick={onItemClick}
      />
      <InfoSub
        infoInputs={infoInputs}
        infoActives={infoActives}
        schoolList={schoolList}
        onInputChange={onInputChange}
        onSchoolChange={onSchoolChange}
        onInfoDropdownActive={onInfoDropdownActive}
        onItemClick={onItemClick}
      />
      <InfoThird infoInputs={infoInputs} onInputChange={onInputChange} />
    </div>
  );
};

export default Info;
