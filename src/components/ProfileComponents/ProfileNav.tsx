import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";
import { CursorDiv } from "../../style/GlobalStyle";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  width: 100px;
  gap: 10px;
  margin-top: 3%;
  margin-left: 10%;
`;

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
      <Div>
        <CursorDiv onClick={() => history.push("/user")}>프로필</CursorDiv>
        <CursorDiv onClick={onLogOutClick}>로그아웃</CursorDiv>
      </Div>
    </>
  );
}

export default ProfileNav;
