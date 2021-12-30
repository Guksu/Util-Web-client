import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthTokenAtom, isLoginAtom } from "../../atom";
import { LOGIN } from "../../gql/mutation";
import { LoginIF } from "../../interfaces/UserIF";

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

  const onLoginSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
      <form onSubmit={onLoginSubmit}>
        <input
          type={"text"}
          name="id"
          placeholder="ID를 입력하세요"
          required
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
        />
        <input
          type={"password"}
          name="passwrod"
          placeholder="Passwrod를 입력하세요"
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <button>로그인</button>
      </form>
      <button onClick={() => history.push("/user/create")}>회원가입</button>
    </>
  );
}

export default Login;
