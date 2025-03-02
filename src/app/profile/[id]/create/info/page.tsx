"use client";

import { completionProgress, defaultId, stepperInit } from "@/lib/atoms";
import { educationEngList, educationList } from "@/lib/data";
import { useDebounce } from "@/lib/hooks";
import { contactFormat, isValid, setOnlyNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import InfoMain from "./components/infoMain";
import InfoSub from "./components/infoSub";
import InfoThird from "./components/infoThird";
import {
  InfoActiveType,
  InfoDataType,
  InfoInputType,
  SchoolType,
  SpecialtyType
} from "./types";
import { educationInputInit, infoActiveInit, infoInputInit } from "./data";
import {
  getSchoolName,
  postEducation,
  postSpecialty,
  postUserProfileSpecialty,
  putEducation,
  putInfoDraft
} from "./api";
import { specialtyData } from "../../../../../lib/atoms";
import ProfileSpecialtyFormModal from "../../components/profileSpecialtyFormModal";
import { getProfileDraft } from "../../api";
import { EducationWithIdType } from "@/lib/types";

const Info = () => {
  const userId = useRecoilValue(defaultId);
  const stepper = useRecoilValue(stepperInit);

  const [completion, setCompletion] = useRecoilState(completionProgress);

  const [infoInputs, setInfoInputs] = useState<InfoInputType>(infoInputInit);
  const [infoActives, setInfoActives] =
    useState<InfoActiveType>(infoActiveInit);

  const [specialties, setSpecialties] =
    useRecoilState<SpecialtyType[]>(specialtyData);
  const [searchSpecialty, setSearchSpecialty] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState<SpecialtyType>({
    id: 0,
    specialtyName: "",
    imageUrl: "",
    mediaUrl: ""
  });

  // 학교 검색 시 보일 학교 리스트(최대 10개)
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [education, setEducation] = useState<EducationWithIdType[] | []>([]);
  const [educationInputs, setEducationInputs] = useState(educationInputInit);
  const [educationId, setEducationId] = useState(0);
  const [profileSpecialtyModal, setProfileSpecialtyModal] = useState(false);

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
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  // 키, 몸무게 입력(숫자만 입력 가능하게)
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  // 출생연도 입력(숫자만 입력 가능하게)
  const onBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
    if (value && !infoActives.bornYear) {
      setInfoActives({ ...infoActives, [name]: true });
    } else if (
      value.length === 4 ||
      (value.length === 0 && infoActives.bornYear)
    ) {
      setInfoActives({ ...infoActives, [name]: false });
    }
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  // 전화번호 입력(전화번호 포맷으로 변경)
  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setInfoInputs({ ...infoInputs, [name]: inputContact });
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  // 학교 검색
  const onSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationInputs({
      ...educationInputs,
      [name]: value
    });
    if (value && !infoActives.school) {
      setInfoActives({ ...infoActives, [name]: true });
    }
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  // 드랍다운 수동 액티브
  const onInfoDropdownActive = (name: string, state: boolean) => {
    setInfoActives({ ...infoActives, [name]: !state });
  };

  // 드랍다운 아이템 클릭
  const onItemClick = (name: string, item: string) => {
    setInfoInputs({ ...infoInputs, [name]: item });
    setCompletion({ ...completion, [name]: true });
    onSaveInfo();
  };

  // 학교검색 딜레이 적용(0.3초)
  const debounceSearch: any = useDebounce(educationInputs.school, 300);

  const onSpecialtyFormModalClose = () => {
    setProfileSpecialtyModal(false);
  };

  const onSpecialtyFormModalOpen = async () => {
    setProfileSpecialtyModal(true);
  };

  const onAddSpecialty = async (newSpecialty: string) => {
    const res = await postSpecialty(newSpecialty);
    const data = {
      id: res.data.id,
      specialtyName: res.data.specialtyName,
      imageUrl: "",
      mediaUrl: ""
    };
    setSpecialties((prev) => [...prev, data]);
    setSpecialty({ id: 0, specialtyName: "", imageUrl: "", mediaUrl: "" });
    setProfileSpecialtyModal(true);
  };
  const onSaveSpecialty = async () => {
    setCompletion({ ...completion, specialty: true });
    setSpecialties(specialties);
    onSpecialtyFormModalClose();

    if (specialties && specialties.length > 0) {
      const profileId = userId;

      for (const specialty of specialties) {
        const specialtyId = specialty.id;
        const mediaUrl = specialty.mediaUrl ?? "";
        await postUserProfileSpecialty(profileId, specialtyId, mediaUrl);
      }
    }
  };

  const onSpecialtyDropdownClick = (name: string, item: string) => {
    const selectedSpecialty = searchSpecialty.find(
      (specialty) => specialty.specialtyName === item
    );
    if (
      selectedSpecialty &&
      !specialties.some((specialty) => specialty.specialtyName === item)
    ) {
      const data = {
        id: selectedSpecialty.id,
        specialtyName: selectedSpecialty.specialtyName,
        imageUrl: "",
        mediaUrl: ""
      };
      setSpecialties((prev) => [...prev, data]);
      setSpecialty({ id: 0, specialtyName: "", imageUrl: "", mediaUrl: "" });
    }
  };

  const onSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecialty({ ...specialty, specialtyName: value });
  };

  const onDeleteSpecialty = (specialtyId: number) => {
    return () => {
      setSpecialties((prev) =>
        prev.filter((specialty) => specialty.id !== specialtyId)
      );
      if (specialties.length === 0) {
        setCompletion({ ...completion, specialty: false });
      }
    };
  };

  const onSaveInfo = async () => {
    const infoData: InfoDataType = {
      name: infoInputs.name,
      bornYear: Number(infoInputs.bornYear),
      height: Number(infoInputs.height),
      weight: Number(infoInputs.weight),
      email: infoInputs.email,
      contact: infoInputs.contact,
      instagramLink: infoInputs.instagram,
      youtubeLink: infoInputs.youtube,
      introduction: infoInputs.introduction
    };
    await putInfoDraft(userId, infoData);
  };

  const onMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationInputs({
      ...educationInputs,
      [name]: value
    });
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

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

  const onCreateEducation = async () => {
    const educationIndex = educationList.indexOf(educationInputs.education);
    const educationStatus = educationEngList[educationIndex];

    const educationData = {
      school: {
        name: educationInputs.school,
        schoolType: "",
        schoolGubun: ""
      },
      major: educationInputs.major,
      status: educationStatus
    };
    await postEducation(userId, educationData);
  };

  const onSaveEducation = async () => {
    const educationIndex = educationList.indexOf(educationInputs.education);
    const educationStatus = educationEngList[educationIndex];

    if (education.length === 0) {
      onCreateEducation();
    } else {
      const educationData = {
        school: {
          name: educationInputs.school,
          schoolType: "",
          schoolGubun: ""
        },
        major: educationInputs.major,
        status: educationStatus
      };
      await putEducation(userId, educationId, educationData);
    }
  };

  const onEducationClick = (name: string, item: string) => {
    setEducationInputs({ ...educationInputs, [name]: item });
    setCompletion({ ...completion, [name]: true });
    onSaveEducation();
  };

  // 내 정보 탭에서 다른 탭으로 이동 시 내 정보 업데이트
  useEffect(() => {
    if (infoInputs.name !== "") {
      onSaveInfo();
    }
    // onSaveEducation();
  }, [stepper]);

  // 내 정보 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfileDraft(userId);
      const data = await res.data;

      if (data.education.length >= 1) {
        const findEducation = educationEngList.findIndex(
          (education: string) => education === data.education[0].status
        );
        setCompletion({
          ...completion,
          schoolName: isValid(data.education[0].school.name),
          schoolMajor: isValid(data.education[0].major),
          schoolStatus: isValid(educationList[findEducation])
        });
        setEducationInputs({
          ...educationInputs,
          education: educationList[findEducation],
          school: data.education[0].school.name,
          major: data.education[0].major
        });
        setEducation(data.education);
        setEducationId(data.education.id);
      }

      setCompletion({
        ...completion,
        name: isValid(data.info.name),
        birth: isValid(data.info.bornYear),
        height: isValid(data.info.height),
        weight: isValid(data.info.weight),
        contact: isValid(data.info.contact),
        email: isValid(data.info.email),
        specialty: isValid(data.specialties),
        youtube: isValid(data.info.youtubeLink),
        instagram: isValid(data.info.instagramLink),
        introduction: isValid(data.info.introduction)
      });

      setInfoInputs({
        ...infoInputs,
        name: data.info.name,
        bornYear: data.info.bornYear,
        height: data.info.height,
        weight: data.info.weight,
        contact: data.info.contact,
        email: data.info.email,
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
        specialties={specialties}
        onInputChange={onInputChange}
        onNumberChange={onNumberChange}
        onBirthChange={onBirthChange}
        onContactChange={onContactChange}
        onInfoDropdownActive={onInfoDropdownActive}
        onItemClick={onItemClick}
        onSpecialtyFormModalOpen={onSpecialtyFormModalOpen}
        onDeleteSpecialty={onDeleteSpecialty}
        onBlurInfo={onSaveInfo}
      />
      <InfoSub
        educationInputs={educationInputs}
        infoActives={infoActives}
        schoolList={schoolList}
        onInputChange={onMajorChange}
        onSchoolChange={onSchoolChange}
        onInfoDropdownActive={onInfoDropdownActive}
        onItemClick={onEducationClick}
        onBlurEducation={onSaveEducation}
      />
      <InfoThird infoInputs={infoInputs} onInputChange={onInputChange} />
      {profileSpecialtyModal && (
        <ProfileSpecialtyFormModal
          type="add"
          specialties={specialties}
          setSpecialties={setSpecialties}
          searchSpecialty={searchSpecialty}
          setSearchSpecialty={setSearchSpecialty}
          specialty={specialty}
          onSpecialtyFormModalClose={onSpecialtyFormModalClose}
          onAddSpecialty={onAddSpecialty}
          onSpecialtyDropdownClick={onSpecialtyDropdownClick}
          onSpecialtyChange={onSpecialtyChange}
          onDeleteSpecialty={onDeleteSpecialty}
          onSaveSpecialty={onSaveSpecialty}
        />
      )}
    </div>
  );
};

export default Info;
