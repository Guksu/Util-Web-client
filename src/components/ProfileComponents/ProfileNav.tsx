import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";
import { CursorDiv } from "../../style/GlobalStyle";

function ProfileNav() {
  const isLogin = useSetRecoilState(isLoginAtom);
  const history = useHistory();
  const onLogOutClick = () => {
    localStorage.clear();
    client.clearStore();
    isLogin(false);
    history.push("/");
  };

  return (
    <>
      <CursorDiv onClick={() => history.push("/user")}>프로필</CursorDiv>
      <CursorDiv onClick={onLogOutClick}>로그아웃</CursorDiv>
    </>
  );
}

export default ProfileNav;
