export const loginErrorMessages: Record<
  string,
  { title: string; message: string }
> = {
  "1000": {
    title: "내부 오류",
    message:
      "서버에서 인증 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
  },
  "1001": {
    title: "인증 취소됨",
    message: "사용자가 인증을 취소했습니다."
  },
  "1002": {
    title: "잘못된 요청",
    message: "요청 정보가 잘못되었습니다."
  },
  "1003": {
    title: "인증 실패",
    message:
      "세션이 만료되었거나 인증 정보가 유효하지 않습니다. 잠시 후 다시 로그인해 주세요."
  },
  "1004": {
    title: "접근 권한 없음",
    message: "해당 리소스에 접근할 수 없습니다. 권한을 확인하세요."
  },
  "9999": {
    title: "외부 서비스 오류",
    message:
      "OAuth 제공자 쪽에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
  }
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
  "뮤직비디오",
  "연극",
  "기타"
];

export const castList = ["주연", "조연", "단역", "직접 입력"];

export const profileInit = {
  data: {
    id: 0,
    userId: 0,
    status: "",
    info: {
      name: "",
      gender: "M",
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
    education: [],
    photos: [],
    recentPhotos: [],
    stillCuts: [],
    filmos: [],
    videos: [],
    specialties: [],
    likesCount: 0,
    likedByMe: true,
    viewsCount: 0,
    createdAt: "",
    updatedAt: ""
  }
};

export const imageCompressionOptions = {
  maxSizeMB: 0.5,
  useWebWorker: true
};

export const year = new Date().getFullYear();
export const yearList = Array.from(new Array(70), (v, index) =>
  (year - index).toString()
);
