import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { client } from "../apollo";
import { isAuthTokenAtom, isLoginAtom } from "../atom";
import { CursorDiv } from "../style/GlobalStyle";

const MobileNavWrapper = styled.div`
  width: 20%;
  height: 200px;

  @media (min-width: 500px) {
    display: none;
  }
`;

const MobileNavDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
  @media (max-width: 411px) {
    font-size: 15px;
  }
`;

function MobileNav() {
  const isAuthToken = useRecoilValue(isAuthTokenAtom);
  const [isLoginState, setIsLoginState] = useRecoilState(isLoginAtom);
  const [togle, setTogle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const loginCheck = () => {
    isAuthToken !== null && isAuthToken === localStorage.getItem("token")
      ? setIsLogin(true)
      : setIsLogin(false);
  };
  const onLogOutClick = () => {
    localStorage.clear();
    client.clearStore();
    setIsLoginState(false);
    history.push("/");
  };
  useEffect(() => {
    loginCheck();
  });
  return (
    <MobileNavWrapper>
      <div
        onClick={() => {
          setTogle(!togle);
        }}
      >
        {togle ? <>&#10005;</> : <> &#8801;</>}
      </div>
      {togle ? (
        <MobileNavDiv>
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
          {isLoginState ? (
            <>
              <CursorDiv
                onClick={() => {
                  history.push("/user");
                }}
              >
                프로필
              </CursorDiv>
              <CursorDiv onClick={onLogOutClick}>로그아웃</CursorDiv>
            </>
          ) : (
            <CursorDiv
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </CursorDiv>
          )}
        </MobileNavDiv>
      ) : (
        <></>
      )}
    </MobileNavWrapper>
  );
}

export default MobileNav;
