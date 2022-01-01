import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CREATE_USER } from "../../gql/mutation";
import { CreateUserIF } from "../../interfaces/UserIF";

const CreateDiv = styled.div`
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
  justify-content: center;
`;
const Button = styled.button`
  width: 10vw;
  min-width: 100px;
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

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (id === "") {
      alert("아이디를 입력하세요");
    } else if (password === "") {
      alert("비밀번호를 입력하세요");
    } else if (name === "") {
      alert("이름을 입력하세요");
    } else {
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
    }
  };

  return (
    <>
      <CreateDiv>
        <InputStyle
          type={"text"}
          required
          placeholder="이름을 입력하세요"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
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
          type={"text"}
          name="passwrod"
          placeholder="Passwrod를 입력하세요"
          required
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <ButtonDiv>
          <Button onClick={onClick}>회원가입</Button>
        </ButtonDiv>
      </CreateDiv>
    </>
  );
}

export default CreateUser;
