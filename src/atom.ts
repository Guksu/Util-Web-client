import { atom } from "recoil";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const isTempAtom = atom({
  key: "isTemp",
  default: 0,
});

export const isAuthTokenAtom = atom({
  key: "isAuthToken",
  default: localStorage.getItem("token"),
});
