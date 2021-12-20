import { atom } from "recoil";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const isTempAtom = atom({
  key: "isTemp",
  default: 0,
});
