export const topBarList = [
  { name: "로고", href: "/" },
  { name: "로그아웃", href: "/" }
];

export const stepperList = [
  { name: "내 정보", id: 0, path: "/info" },
  { name: "사진", id: 1, path: "/photo" },
  { name: "작품 활동", id: 2, path: "/filmo" },
  { name: "영상", id: 3, path: "/video" }
];

export const infoResponseInit = {
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

export const infoInputInit = {
  name: "",
  birth: "",
  height: "",
  weight: "",
  contact: "",
  email: "",
  speciality: "",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/@",
  introduction: "",
  school: "",
  major: "",
  education: "졸업"
};

export const infoActiveInit = {
  birth: false,
  school: false,
  education: false
};

export const photoResponseInit = {
  id: "",
  userProfileId: 0,
  path: "",
  previewPath: "",
  displayOrder: 0,
  isDefault: false,
  createdAt: "",
  updatedAt: ""
};

export const photoModalInit = {
  id: "",
  state: "",
  active: false,
  name: "",
  buttonText: ""
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
  id: 0,
  displayOrder: 0
};

export const filmographyActiveInit = {
  classification: false,
  production: false,
  cast: false
};

export const filmoModalInit = {
  state: "",
  active: false,
  name: "",
  buttonText: ""
};

export const filmoDeleteInit = {
  id: 0,
  active: false
};

export const videoResponseInit = {
  id: 0,
  userProfileId: 0,
  url: "",
  displayOrder: 0
};

export const videoModalInit = {
  id: 0,
  state: "",
  active: false,
  name: "",
  buttonText: ""
};

export const videoLinkInit = {
  url: "",
  active: false
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

export const profileInit = {
  id: 0,
  userId: 0,
  status: "",
  info: {
    name: "",
    bornYear: 0,
    height: 0,
    weight: 0,
    email: "",
    contact: "",
    speciality: "",
    instagramLink: "",
    youtubeLink: "",
    introduction: ""
  },
  education: [
    {
      school: {
        name: "",
        schoolType: "",
        schoolGubun: ""
      },
      major: "",
      status: ""
    }
  ],
  photos: [
    {
      id: "",
      userProfileId: 0,
      path: "",
      previewPath: "",
      displayOrder: 0,
      isDefault: false,
      createdAt: "",
      updatedAt: ""
    }
  ],
  filmos: [
    {
      id: 0,
      role: {
        id: 0,
        name: ""
      },
      customRole: "",
      character: "",
      is_featured: false,
      production: {
        category: {
          id: 0,
          name: ""
        },
        productionYear: 0,
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: ""
      },
      displayOrder: 0
    }
  ],
  videos: [
    {
      id: 0,
      userProfileId: 0,
      url: "",
      displayOrder: 0
    }
  ],
  createdAt: "",
  updatedAt: ""
};

export const selectedPhotoInit = {
  origin: "",
  blur: ""
};

export const profileModalInit = {
  state: "",
  active: false
};

export const year = new Date().getFullYear();
export const yearList = Array.from(new Array(70), (v, index) =>
  (year - index).toString()
);
