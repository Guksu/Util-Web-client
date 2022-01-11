import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { client } from "../../apollo";
import { isLoginAtom } from "../../atom";
import { DELETE_USER } from "../../gql/mutation";
import { DeleteUserIF } from "../../interfaces/UserIF";
import ProfileLayOut from "./ProfileLayOut";

const DeleteContent = styled.div`
  margin-bottom: 5%;
`;

function DeleteUser() {
  const isLogin = useSetRecoilState(isLoginAtom);
  const [password, setPassword] = useState("");
  const [deleteUser] = useMutation<DeleteUserIF>(DELETE_USER, {
    variables: { deleteUserInput: { password } },
  });
  const history = useHistory();

  const divContent = (
    <div>
      <DeleteContent>회원 탈퇴 시 복구할 수 없습니다.</DeleteContent>
      <DeleteContent>
        탈퇴를 원하면 아래에 비밀번호를 입력해 주세요
      </DeleteContent>
      <input
        type={"password"}
        required
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
    </div>
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
