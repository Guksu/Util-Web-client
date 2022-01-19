import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isAuthTokenAtom } from "../atom";
import { CursorDiv } from "../style/GlobalStyle";

const Div = styled.div`
  display: flex;
  gap: 40px;
  @media (max-width: 1024px) {
    gap: 10px;
  }
`;

function MenuNav() {
  const isAuthToken = useRecoilValue(isAuthTokenAtom);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const loginCheck = () => {
    isAuthToken !== null && isAuthToken === localStorage.getItem("token")
      ? setIsLogin(true)
      : setIsLogin(false);
  };

  useEffect(() => {
    loginCheck();
  });
  return (
    <>
      <Div>
        <CursorDiv
          onClick={() => {
            history.push("/");
          }}
        >
          메인
        </CursorDiv>
        <CursorDiv
          onClick={() => {
            {
              isLogin ? history.push("/account") : history.push("/login");
            }
          }}
        >
          가계부
        </CursorDiv>
        <CursorDiv
          onClick={() => {
            {
              isLogin ? history.push("/fassion") : history.push("/login");
            }
          }}
        >
          스타일
        </CursorDiv>
        <CursorDiv
          onClick={() => {
            {
              isLogin ? history.push("/food") : history.push("/login");
            }
          }}
        >
          맛집
        </CursorDiv>
        <CursorDiv
          onClick={() => {
            {
              isLogin ? history.push("/fleamarket") : history.push("/login");
            }
          }}
        >
          플리마켓
        </CursorDiv>
      </Div>
    </>
  );
}

export default MenuNav;
