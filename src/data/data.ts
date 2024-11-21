export const topBarList = [
  { name: "로고", href: "/" },
  { name: "로그아웃", href: "/" }
];

export const stepList = [
  { name: "내 정보", id: 0 },
  { name: "사진", id: 1 },
  { name: "작품 활동", id: 2 },
  { name: "영상", id: 3 }
];

export const infoInitData = {
  status: "PUBLIC",
  name: "",
  bornYear: 0,
  height: 0,
  weight: 0,
  email: "",
  contact: "",
  speciality: "",
  instagramLink: "",
  youtubeLink: "",
  introduction: "",
  education: [
    {
      school: {
        name: "",
        schoolType: "",
        schoolGubun: ""
      },
      major: "",
      status: "GRADUATED"
    }
  ]
};

export const infoActiveInit = {
  birth: false,
  school: false,
  education: false
};

export const filmographyInputInit = {
  classification: "",
  production: "",
  title: "",
  cast: "",
  castInput: "",
  casting: "",
  description: "",
  link: "",
  thumbnail: "",
  representative: false,
  id: ""
};

export const filmographyActiveInit = {
  classification: false,
  production: false,
  cast: false
};

export const educationList = [
  "졸업",
  "졸업 예정",
  "재학 중",
  "휴학",
  "수료",
  "중퇴"
];

export const educationEngList = [
  "GRADUATED",
  "PENDING",
  "ENROLLED",
  "LEAVE_OF_ABSENCE",
  "COMPLETION",
  "DROPPED_OUT"
];

export const classificationList = [
  "장편상업영화",
  "장편독립영화",
  "단편영화",
  "TV드라마",
  "웹드라마",
  "광고",
  "뮤지컬",
  "뮤직비디오",
  "연극",
  "기타"
];

export const castList = ["주연", "조연", "단역", "직접 입력"];

export const year = new Date().getFullYear();
export const yearList = Array.from(new Array(70), (v, index) =>
  (year - index).toString()
);
