import { atom } from "recoil";

export const isLogginAtom = atom({
  key: "isLoggin",
  default: false,
});

export const isTempAtom = atom({
  key: "isTemp",
  default: 0,
});
