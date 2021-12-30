import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateUserIF } from "../../intefaces/UserIF";

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      ok
      error
    }
  }
`;

function CreateUser() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [createUser] = useMutation<CreateUserIF>(CREATE_USER, {
    variables: {
      createUserInput: {
        id,
        name,
        password,
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser();
      if (data?.createUser.ok) {
        alert("회원가입에 성공하셨습니다 !");
        history.push("/login");
      } else {
        alert(data?.createUser.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          required
          placeholder="이름을 입력하세요"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
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
          type={"text"}
          name="passwrod"
          placeholder="Passwrod를 입력하세요"
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <button>회원가입</button>
      </form>
    </>
  );
}

export default CreateUser;
