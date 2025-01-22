"use client";

import { getProfile } from "@/lib/api";
import { defaultId, stepperInit } from "@/lib/atoms";
import { educationEngList, educationList } from "@/lib/data";
import { useDebounce } from "@/lib/hooks";
import { contactFormat, setOnlyNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import InfoMain from "./components/infoMain";
import InfoSub from "./components/infoSub";
import InfoThird from "./components/infoThird";
import { InfoActiveType, InfoInputType, SchoolType } from "./types";
import { infoActiveInit, infoInputInit } from "./data";
import { getSchoolName, putInfo } from "./api";

const Info = () => {
  const userId = useRecoilValue(defaultId);
  const stepper = useRecoilValue(stepperInit);

  const [infoInputs, setInfoInputs] = useState<InfoInputType>(infoInputInit);
  const [infoActives, setInfoActives] =
    useState<InfoActiveType>(infoActiveInit);

  // 학교 검색 시 보일 학교 리스트(최대 10개)
  const [schoolList, setSchoolList] = useState<string[]>([]);

  // 내 정보 입력
  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
    } else if (
      value.length === 4 ||
      (value.length === 0 && infoActives.birth)
    ) {
      setInfoActives({ ...infoActives, [name]: false });
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

  // 학교검색 딜레이 적용(0.3초)
  const debounceSearch: any = useDebounce(infoInputs.school, 300);

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
      if (stepper !== 0) {
        const educationIndex = educationList.indexOf(infoInputs.education);
        const educationStatus = educationEngList[educationIndex];

        const infoData: any = {
          status: "PUBLIC",
          info: {
            name: infoInputs.name,
            bornYear: Number(infoInputs.birth),
            height: Number(infoInputs.height),
            weight: Number(infoInputs.weight),
            email: infoInputs.email,
            contact: infoInputs.contact,
            speciality: infoInputs.speciality,
            instagramLink: infoInputs.instagram,
            youtubeLink: infoInputs.youtube,
            introduction: infoInputs.introduction
          },
          education: []
        };
        infoInputs.school
          ? (infoData.education = [
              {
                school: {
                  name: infoInputs.school,
                  schoolType: "",
                  schoolGubun: ""
                },
                major: infoInputs.major,
                status: educationStatus
              }
            ])
          : (infoData.education = []);

        await putInfo(userId, infoData);
      }
    };
    onStepper();
  }, [stepper]);

  // 내 정보 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile(userId);
      const data = await res.data;
      console.log(data);

      if (data.education.length >= 1) {
        const findEducation = educationEngList.findIndex(
          (education: string) => education === data.education[0].status
        );
        setInfoInputs({
          ...infoInputs,
          education: educationList[findEducation],
          school: data.education[0].school.name,
          major: data.education[0].major
        });
      }

      setInfoInputs({
        ...infoInputs,
        name: data.info.name,
        birth: data.info.bornYear,
        height: data.info.height,
        weight: data.info.weight,
        contact: data.info.contact,
        email: data.info.email,
        speciality: data.info.speciality,
        instagram: data.info.instagramLink,
        youtube: data.info.youtubeLink,
        introduction: data.info.introduction
      });
    };
    getProfileData();
  }, []);

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
