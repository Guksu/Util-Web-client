import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isAuthTokenAtom, isLoginAtom } from "../../atom";
import { LOGIN } from "../../gql/mutation";
import { LoginIF } from "../../interfaces/UserIF";

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  min-width: 300px;
  margin: auto;
  padding-top: 20vh;
`;

const InputStyle = styled.input`
  margin-bottom: 10%;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 8vw;
  min-width: 70px;
`;

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = useSetRecoilState(isLoginAtom);
  const isAuthToken = useSetRecoilState(isAuthTokenAtom);
  const history = useHistory();
  const [login] = useMutation<LoginIF>(LOGIN, {
    variables: {
      loginInput: {
        id,
        password,
      },
    },
  });

  const onLoginClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const { data } = await login();
      if (data?.login.ok && data.login.token) {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("id", id);
        isAuthToken(data.login.token);
        isLogin(true);
        window.location.replace("/");
      } else {
        alert(data?.login.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginDiv>
        <InputStyle
          type={"text"}
          name="id"
          placeholder="ID를 입력하세요"
          required
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
        />
        <InputStyle
          type={"password"}
          name="passwrod"
          placeholder="Passwrod를 입력하세요"
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <ButtonDiv>
          <Button onClick={onLoginClick}>로그인</Button>
          <Button onClick={() => history.push("/user/create")}>회원가입</Button>
        </ButtonDiv>
      </LoginDiv>
    </>
  );
}

export default Login;
