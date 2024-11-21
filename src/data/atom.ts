import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const defaultId = atom({
  key: "defaultId",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

export const jwt = atom({
  key: "jwt",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const stepperInit = atom({
  key: "stepperInit",
  default: 0
});

export const info = atom({
  key: "info",
  default: {
    name: "",
    birth: "",
    height: "",
    weight: "",
    contact: "",
    email: "",
    specialty: "",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/@",
    introduction: "",
    school: "",
    major: "",
    education: "졸업"
  }
});

export const photo = atom({
  key: "photo",
  default: []
});

export const filmography = atom({
  key: "filmography",
  default: []
});

export const mainPhoto = atom({
  key: "mainPhoto",
  default: { photo: "", id: 0 }
});

export const video = atom({
  key: "video",
  default: []
});

export const profile = atom({
  key: "profile",
  default: {
    info: {
      name: "",
      birth: "",
      height: "",
      weight: "",
      contact: "",
      email: "",
      specialty: "",
      instagram: "",
      youtube: "",
      introduction: "",
      school: "",
      major: "",
      education: "졸업"
    },
    photo: [],
    filmography: []
  },
  effects_UNSTABLE: [persistAtom]
});
