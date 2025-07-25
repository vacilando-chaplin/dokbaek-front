import { ProfileEducationDataType } from "./edit/types";

// 학교명으로만 학교급 판별
export const useGetSchoolLevel = (schoolName: string) => {
  const name = schoolName.toLowerCase().replace(/\s+/g, "");

  // 대학원
  if (name.includes("대학원")) {
    return 6;
  }

  // 4년제 대학교
  if (
    name.includes("대학교") ||
    name.includes("대학") ||
    name.includes("카이스트") ||
    name.includes("kaist") ||
    name.includes("과학기술원")
  ) {
    return 5;
  }

  // 전문대학
  if (
    name.includes("전문대") ||
    name.includes("전문학교") ||
    name.includes("기능대학") ||
    name.includes("폴리텍")
  ) {
    return 4;
  }

  // 고등학교
  if (
    name.includes("고등학교") ||
    name.includes("고교") ||
    name.includes("고등")
  ) {
    return 3;
  }

  // 중학교
  if (
    name.includes("중학교") ||
    name.includes("중등학교") ||
    name.includes("중학")
  ) {
    return 2;
  }

  // 초등학교
  if (
    name.includes("초등학교") ||
    name.includes("국민학교") ||
    name.includes("초등")
  ) {
    return 1;
  }

  return 0; // 판별 불가
};

export const useGetFinalEducation = (
  educationList: ProfileEducationDataType[]
): ProfileEducationDataType | null => {
  if (!educationList || educationList.length === 0) {
    return null;
  }

  const processedList = educationList.map((edu) => ({
    ...edu,
    schoolLevel: useGetSchoolLevel(edu.school.name)
  }));

  // 1단계: 졸업/수료한 최고학력
  const completed = processedList.filter((edu) =>
    ["졸업", "GRADUATED", "수료", "COMPLETION"].includes(edu.status)
  );

  if (completed.length > 0) {
    return completed.reduce((highest, current) =>
      current.schoolLevel > highest.schoolLevel ? current : highest
    );
  }

  // 2단계: 졸업예정인 최고학력
  const pending = processedList.filter((edu) =>
    ["졸업 예정", "PENDING"].includes(edu.status)
  );

  if (pending.length > 0) {
    return pending.reduce((highest, current) =>
      current.schoolLevel > highest.schoolLevel ? current : highest
    );
  }

  // 3단계: 재학중인 최고학력 (휴학보다 재학중 우선)
  const enrolled = processedList.filter((edu) =>
    ["재학 중", "ENROLLED"].includes(edu.status)
  );

  if (enrolled.length > 0) {
    return enrolled.reduce((highest, current) =>
      current.schoolLevel > highest.schoolLevel ? current : highest
    );
  }

  // 4단계: 휴학중인 최고학력
  const onLeave = processedList.filter((edu) =>
    ["휴학", "LEAVE_OF_ABSENCE"].includes(edu.status)
  );

  if (onLeave.length > 0) {
    return onLeave.reduce((highest, current) =>
      current.schoolLevel > highest.schoolLevel ? current : highest
    );
  }

  // 5단계: 중퇴한 최고학력
  const dropped = processedList.filter((edu) =>
    ["중퇴", "DROPPED_OUT"].includes(edu.status)
  );

  if (dropped.length > 0) {
    return dropped.reduce((highest, current) =>
      current.schoolLevel > highest.schoolLevel ? current : highest
    );
  }

  return null;
};
