import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";

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
      <div onClick={() => history.push("/user")}>프로필</div>
      <div onClick={onLogOutClick}>로그아웃</div>
    </>
  );
}

export default ProfileNav;
