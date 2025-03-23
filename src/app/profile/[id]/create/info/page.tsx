"use client";

import {
  completionProgress,
  isDraftComplete,
  profileIdInit,
  stepperInit
} from "@/lib/atoms";
import { educationEngList, educationEnum, educationList } from "@/lib/data";
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
import { infoActiveInit, infoInputInit } from "./data";
import {
  deleteEducation,
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
  const profileId = useRecoilValue(profileIdInit);
  const stepper = useRecoilValue(stepperInit);
  const isDraftLoading = useRecoilValue(isDraftComplete);

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
  const [education, setEducation] = useState<EducationWithIdType[]>([]);
  const [educationActives, setEducationActives] = useState({
    school: false,
    education: false
  });
  const [profileSpecialtyModal, setProfileSpecialtyModal] = useState(false);

  const onSelectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoInputs({ ...infoInputs, gender: e.target.id });
    setCompletion({ ...completion, gender: true });
    onSaveInfo();
  };

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
    value.length >= 4
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
      gender: infoInputs.gender,
      bornYear: Number(infoInputs.bornYear),
      height: Number(infoInputs.height),
      weight: Number(infoInputs.weight),
      email: infoInputs.email,
      contact: infoInputs.contact,
      instagramLink: infoInputs.instagram,
      youtubeLink: infoInputs.youtube,
      introduction: infoInputs.introduction
    };
    await putInfoDraft(profileId, infoData);
  };

  // 학교 검색
  const onSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEducation((prev) => [
      {
        ...prev[0],
        school: {
          ...prev[0].school,
          [name]: value
        }
      }
    ]);

    // if (value && !educationActives.school) {
    //   setEducationActives({ ...educationActives, school: true });
    // }
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  // 학교검색 딜레이 적용(0.3초)
  // const debounceSearch: string =
  //   education.length >= 1 ? useDebounce(education[0].school.name, 300) : "";

  // useEffect(() => {
  //   const getSearchSchool = async (name: string) => {
  //     const data = await getSchoolName(name);
  //     const filteredSchoolName = data.map(
  //       (school: SchoolType) => school.schoolName
  //     );
  //     setSchoolList(filteredSchoolName);
  //   };
  //   getSearchSchool(debounceSearch);
  // }, [debounceSearch]);

  // useEffect(() => {
  //   if (education.length >= 1) {
  //     const getSearchSchool = async (name: string) => {
  //       const data = await getSchoolName(name);
  //       const filteredSchoolName = data.map(
  //         (school: SchoolType) => school.schoolName
  //       );
  //       setSchoolList(filteredSchoolName);
  //     };
  //     getSearchSchool(education[0].school.name);
  //   }
  // }, [education]);

  // const onSchoolDropdownActive = () => {
  //   setEducationActives({
  //     ...educationActives,
  //     school: !educationActives.school
  //   });
  // };

  const onEducationDropdownActive = () => {
    setEducationActives({
      ...educationActives,
      education: !educationActives.education
    });
  };

  // const onSchoolDropdownClick = (name: string, item: string) => {
  //   setEducation((prev) => [
  //     {
  //       ...prev[0],
  //       school: {
  //         ...prev[0].school,
  //         name: item
  //       }
  //     }
  //   ]);
  //   setEducationActives({
  //     ...educationActives,
  //     school: !educationActives.school
  //   });
  //   onSaveEducation(education[0].id);
  // };

  const onEducationDropdownClick = (name: string, item: string) => {
    setEducation((prev) => [
      {
        ...prev[0],
        status: item
      }
    ]);
    setEducationActives({
      ...educationActives,
      education: !educationActives.education
    });
    onSaveEducation(education[0].id);
  };

  const onMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation([
      {
        ...education[0],
        [name]: value
      }
    ]);
    isValid(value)
      ? setCompletion({ ...completion, [name]: true })
      : setCompletion({ ...completion, [name]: false });
  };

  const onCreateEducation = async () => {
    const educationData = {
      school: {
        name: "",
        schoolType: "",
        schoolGubun: ""
      },
      major: "",
      status: "GRADUATED"
    };
    const res = await postEducation(profileId, educationData);
    const data = res.data;

    const educationInit = [
      {
        id: data.id,
        school: {
          name: data.school.name,
          schoolType: data.school.schoolType,
          schoolGubun: data.school.schoolGubun
        },
        major: data.major,
        status: educationList[0]
      }
    ];

    setEducation(educationInit);
  };

  // const onDeleteEducation = async (educationId: number) => {
  //   await deleteEducation(profileId, educationId);

  //   const res = await getProfileDraft(profileId);
  //   const data = await res.data;

  //   setEducation(data.education);
  // };

  const onDeleteEducation = async (educationId: number) => {
    const educationData = {
      school: {
        name: "",
        schoolType: "",
        schoolGubun: ""
      },
      major: "",
      status: "GRADUATED"
    };
    const res = await putEducation(profileId, educationId, educationData);
    const data = await res.data;

    const tempEducation = {
      id: data.id,
      school: {
        name: data.school.name,
        schoolType: data.school.schoolType,
        schoolGubun: data.school.schoolGubun
      },
      major: data.major,
      status: "졸업"
    };
    setEducation([tempEducation]);
    setEducationActives({
      ...educationActives,
      education: false
    });
  };

  const onSaveEducation = async (educationId: number) => {
    const educationIndex = education.findIndex(
      (item) => item.id === educationId
    );
    const educationStatus = education[educationIndex].status;

    const status = () => {
      for (const [key, value] of Object.entries(educationEnum)) {
        if (value === educationStatus) {
          return key;
        }
      }
      return "GRADUATED";
    };

    const educationData = {
      school: {
        name: education[educationIndex].school.name,
        schoolType: education[educationIndex].school.schoolType,
        schoolGubun: education[educationIndex].school.schoolGubun
      },
      major: education[educationIndex].major,
      status: status()
    };
    await putEducation(profileId, education[0].id, educationData);
  };

  // 내 정보 탭에서 다른 탭으로 이동 시 내 정보 업데이트
  useEffect(() => {
    if (infoInputs.name !== "") {
      onSaveInfo();
    }
    if (education.length >= 1) {
      onSaveEducation(education[0].id);
    }
  }, [stepper]);

  // 내 정보 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      if (isDraftLoading) {
        const res = await getProfileDraft(profileId);
        const data = await res.data;

        if (data.education.length >= 1) {
          const findEducation = educationEngList.findIndex(
            (education: string) => education === data.education[0].status
          );

          const educationInit = [
            {
              id: data.education[0].id,
              school: {
                name: data.education[0].school.name,
                schoolType: data.education[0].school.schoolType,
                schoolGubun: data.education[0].school.schoolGubun
              },
              major: data.education[0].major,
              status: educationList[0]
            }
          ];
          setCompletion({
            ...completion,
            schoolName: isValid(data.education[0].school.name),
            schoolMajor: isValid(data.education[0].major),
            schoolStatus: isValid(educationList[findEducation])
          });
          setEducation(educationInit);
        }

        setCompletion({
          ...completion,
          name: isValid(data.info.name),
          gender: isValid(data.info.gender),
          bornYear: isValid(data.info.bornYear),
          height: data.info.height > 0 ? true : false,
          weight: data.info.weight > 0 ? true : false,
          contact: isValid(data.info.contact),
          email: isValid(data.info.email),
          specialty: isValid(data.specialties),
          youtube: isValid(data.info.youtubeLink),
          instagram: isValid(data.info.instagramLink),
          introduction: isValid(data.info.introduction),
          profilePhoto: isValid(data.photos),
          stillcutPhoto: isValid(data.stillCuts),
          recentPhoto: isValid(data.recentPhotos),
          filmography: isValid(data.filmos),
          video: isValid(data.videos)
        });

        setInfoInputs({
          ...infoInputs,
          name: data.info.name,
          gender: data.info.gender,
          bornYear: data.info.bornYear,
          height: data.info.height,
          weight: data.info.weight,
          contact: data.info.contact,
          email: data.info.email,
          instagram: data.info.instagramLink,
          youtube: data.info.youtubeLink,
          introduction: data.info.introduction
        });
      }
    };
    getProfileData();
  }, [isDraftLoading]);

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <InfoMain
        infoInputs={infoInputs}
        infoActives={infoActives}
        specialties={specialties}
        onSelectGender={onSelectGender}
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
        education={education}
        educationActives={educationActives}
        schoolList={schoolList}
        onSchoolChange={onSchoolChange}
        onMajorChange={onMajorChange}
        // onSchoolDropdownActive={onSchoolDropdownActive}
        onEducationDropdownActive={onEducationDropdownActive}
        // onSchoolDropdownClick={onSchoolDropdownClick}
        onEducationDropdownClick={onEducationDropdownClick}
        onBlurEducation={onSaveEducation}
        onCreateEducation={onCreateEducation}
        onDeleteEducation={onDeleteEducation}
      />
      <InfoThird
        infoInputs={infoInputs}
        onInputChange={onInputChange}
        onSaveInfo={onSaveInfo}
      />
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
