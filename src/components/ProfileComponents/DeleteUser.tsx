import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";
import ProfileLayOut from "./ProfileLayOut";

interface DeleteUserOutput {
  ok: string;
  error?: string;
}

interface DeleteUserIF {
  deleteUser: DeleteUserOutput;
}

const DELETE_USER = gql`
  mutation deleteUser($deleteUserInput: DeleteUserInput!) {
    deleteUser(input: $deleteUserInput) {
      ok
      error
    }
  }
`;

function DeleteUser() {
  const isLogin = useSetRecoilState(isLoginAtom);
  const [password, setPassword] = useState("");
  const [deleteUser] = useMutation<DeleteUserIF>(DELETE_USER, {
    variables: { deleteUserInput: { password } },
  });
  const history = useHistory();

  const divContent = (
    <input
      placeholder="비밀번호를 입력해주세요"
      required
      onChange={(e) => {
        setPassword(e.currentTarget.value);
      }}
    />
  );

  const onBtnClick: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteUser();
      if (data?.deleteUser.ok) {
        alert("정상적으로 탈퇴 되었습니다.");
        localStorage.clear();
        client.clearStore();
        isLogin(false);
        history.push("/");
      } else {
        alert(data?.deleteUser.error);
      }
    } catch (error) {}
  };

  return (
    <>
      <ProfileLayOut
        divName="회원탈퇴"
        divContent={divContent}
        btnName="탈퇴하기"
        btnOnclick={onBtnClick}
      />
    </>
  );
}

export default DeleteUser;
