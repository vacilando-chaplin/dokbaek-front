import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const stepperAtom = atom({
  key: "stepperAtom",
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
    instagram: "",
    youtube: "",
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
