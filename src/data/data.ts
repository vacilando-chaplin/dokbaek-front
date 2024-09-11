export const topBarList = [
  { name: "로고", href: "/home" },
  { name: "로그아웃", href: "/login" }
];

export const stepList = [
  { name: "내 정보", id: 0 },
  { name: "사진", id: 1 },
  { name: "작품 활동", id: 2 }
];

export const infoInputInit = {
  name: "",
  birth: "",
  height: "",
  weight: "",
  contact: "",
  email: "",
  specialty: "",
  instagram: "",
  youtube: "",
  school: "",
  major: "",
  education: "졸업"
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
  casting: "",
  description: "",
  link: "",
  thumbnail: "",
  representive: false,
  id: 0
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
  "중퇴",
  "자퇴"
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

export const castList = [
  "주연",
  "조연",
  "단역",
  "엑스트라",
  "까메오",
  "우정출연",
  "특별출연",
  "찬조출연"
];

export const year = new Date().getFullYear();
export const yearList = Array.from(new Array(70), (v, index) =>
  (year - index).toString()
);
