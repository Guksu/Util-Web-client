import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";

interface ChangePwOutput {
  ok: string;
  error?: string;
}

interface ChangePwIF {
  changePw: ChangePwOutput;
}

const CHANGE_PW = gql`
  mutation changePw($changePwInput: ChangePwInput!) {
    changePw(input: $changePwInput) {
      ok
      error
    }
  }
`;

function EditPw() {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const isLogin = useSetRecoilState(isLoginAtom);
  const [changePw] = useMutation<ChangePwIF>(CHANGE_PW, {
    variables: {
      changePwInput: {
        password,
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
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
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="바꾸실 비빌번호를 입력하세요"
          name="password"
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <button>비밀번호 바꾸기</button>
      </form>
    </>
  );
}

export default EditPw;
