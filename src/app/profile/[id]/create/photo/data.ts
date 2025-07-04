export const photoModalInit = {
  id: "",
  state: "",
  active: false,
  name: "",
  buttonText: "",
  category: ""
};

export const recentPhotoData = [
  {
    photoType: "FULL_BODY",
    name: "전신 사진"
  },
  {
    photoType: "FRONT_FACE",
    name: "얼굴 정면 사진"
  },
  {
    photoType: "LEFT_FACE",
    name: "얼굴 좌측 사진"
  },
  { photoType: "RIGHT_FACE", name: "얼굴 우측 사진" }
];

export const categoryDetails = {
  photos: {
    title: "프로필 사진",
    helperText:
      "자신의 매력을 가장 잘 보여줄 수 있는 프로필 사진을 추가해주세요."
  },
  stillCuts: {
    title: "스틸컷",
    helperText: "출연할 작품 안에서의 모습이 담긴 사진을 추가해주세요."
  },
  recentPhotos: {
    title: "최근 사진",
    helperText: "최근 3개월 내에 보정 없이 촬영한 사진을 추가해주세요."
  }
};
