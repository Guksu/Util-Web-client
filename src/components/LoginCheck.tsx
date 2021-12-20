import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../atom";

function LoginCheck() {
  const isLogin = useRecoilValue(isLoginAtom);
  const history = useHistory();

  return <>{isLogin ? <></> : history.push("/login")}</>;
}

export default LoginCheck;
