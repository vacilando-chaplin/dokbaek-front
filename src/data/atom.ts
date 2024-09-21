import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
      school: "",
      major: "",
      education: "졸업"
    },
    photo: [{}],
    filmography: [{}]
  }
  // effects_UNSTABLE: [persistAtom]
});
