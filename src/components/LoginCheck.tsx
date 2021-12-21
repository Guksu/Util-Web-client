import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthTokenAtom, isLoginAtom } from "../atom";

function LoginCheck() {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const history = useHistory();
  const isAuthToken = useRecoilValue(isAuthTokenAtom);
  useEffect(() => {
    if (isAuthToken !== null && isAuthToken === localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      history.push("/");
    }
  });

  return <></>;
}

export default LoginCheck;
