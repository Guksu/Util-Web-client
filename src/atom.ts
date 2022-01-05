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

export const isLatAtom = atom({
  key: "isLat",
  default: 0,
});

export const isLonAtom = atom({
  key: "isLon",
  default: 0,
});

export const isFoodNoAtom = atom({
  key: "isFoodNo",
  default: 0,
});

export const isFoodTitleAtom = atom({
  key: "isFoodTitle",
  default: "",
});

export const isFoodContentAtom = atom({
  key: "isFoodContent",
  default: "",
});

export const isDarkThemAtom = atom({
  key: "isDark",
  default: localStorage.getItem("theme") || "lightTheme",
});
