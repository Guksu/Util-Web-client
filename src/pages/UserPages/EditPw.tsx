import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";
import { CHANGE_PW } from "../../gql/mutation";
import { ChangePwIF } from "../../interfaces/UserIF";
import { InputStyle, LoginDiv } from "./Login";

export const EditBtn = styled.button`
  width: 8vw;
  min-width: 70px;
  margin: auto;
`;

function EditPw() {
  const [password, setPassword] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const history = useHistory();
  const isLogin = useSetRecoilState(isLoginAtom);
  const [changePw] = useMutation<ChangePwIF>(CHANGE_PW, {
    variables: {
      changePwInput: {
        password,
      },
    },
  });

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (password === "") {
      alert("비밀번호를 다시 입력하세요");
    } else if (password !== checkPw) {
      alert("비밀번호를 다시 입력하세요");
    } else {
      try {
        const { data } = await changePw();
        if (!data?.changePw.ok) {
          alert(data?.changePw.error);
        } else {
          alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
          localStorage.clear();
          client.clearStore();
          isLogin(false);
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <LoginDiv>
        <InputStyle
          placeholder="변경할 비빌번호를 입력하세요"
          type={"password"}
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <InputStyle
          placeholder="변경 한 비밀번호를 다시 입력하세요"
          type={"password"}
          required
          onChange={(e) => {
            setCheckPw(e.currentTarget.value);
          }}
        />
        <EditBtn onClick={onClick}>비밀번호 바꾸기</EditBtn>
      </LoginDiv>
    </>
  );
}

export default EditPw;
