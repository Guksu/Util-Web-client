import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";
import { CursorDiv } from "../../style/GlobalStyle";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  padding-top: 20%;
  width: 90px;
  height: 70px;
  gap: 20px;
  margin-top: 7%;
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.divOutLineColor};
  border-radius: 10px;
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
