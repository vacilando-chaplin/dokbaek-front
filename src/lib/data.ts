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

export const educationEnum = {
  GRADUATED: "졸업",
  PENDING: "졸업 예정",
  ENROLLED: "재학 중",
  LEAVE_OF_ABSENCE: "휴학",
  COMPLETION: "수료",
  DROPPED_OUT: "중퇴"
};

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

export const profileResponseInit = {
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
    instagramLink: "",
    youtubeLink: "",
    introduction: ""
  },
  mainPhotoPath: "",
  mainPhotoPreviewPath: "",
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
      path: "",
      previewPath: "",
      displayOrder: 0,
      createdAt: "",
      updatedAt: ""
    }
  ],
  recentPhotos: [
    {
      id: "",
      photoType: "",
      path: "",
      previewPath: "",
      createdAt: "",
      updatedAt: ""
    }
  ],
  stillCuts: [
    {
      id: "",
      path: "",
      previewPath: "",
      displayOrder: 0,
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
      isFeatured: true,
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
      url: "",
      displayOrder: 0
    }
  ],
  specialties: [
    {
      id: 0,
      specialty: {
        id: 0,
        specialtyName: ""
      },
      imageUrl: "",
      mediaUrl: "",
      displayOrder: 0,
      createdAt: "",
      updatedAt: ""
    }
  ],
  likesCount: 0,
  likedByMe: true,
  viewsCount: 0,
  createdAt: "",
  updatedAt: ""
};

export const imageCompressionOptions = {
  maxSizeMB: 0.5,
  useWebWorker: true
};

export const year = new Date().getFullYear();
export const yearList = Array.from(new Array(70), (v, index) =>
  (year - index).toString()
);
