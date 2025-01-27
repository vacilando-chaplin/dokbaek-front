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
  education: [],
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

export const year = new Date().getFullYear();
export const yearList = Array.from(new Array(70), (v, index) =>
  (year - index).toString()
);

export const specialityList = [
  { id: 1, specialtyName: "연기"},
  { id: 2, specialtyName: "댄스"},
  { id: 3, specialtyName: "노래"},
  { id: 4, specialtyName: "모델"},
  { id: 5, specialtyName: "스포츠"},
  { id: 6, specialtyName: "기타"},
  { id: 7, specialtyName: "경상도 사투리"},
  { id: 8, specialtyName: "전라도 사투리"},
  { id: 9, specialtyName: "충청도 사투리"},
  { id: 10, specialtyName: "강원도 사투리"},
]
