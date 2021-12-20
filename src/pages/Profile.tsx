import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { client } from "../apollo";
import { isLogginAtom } from "../atom";

function Profile() {
  const isLogin = useSetRecoilState(isLogginAtom);
  const history = useHistory();
  const onLogOutClick = () => {
    localStorage.clear();
    client.clearStore();
    isLogin(false);
    history.push("/");
  };

  return (
    <>
      <div onClick={onLogOutClick}>로그아웃</div>
    </>
  );
}

export default Profile;
