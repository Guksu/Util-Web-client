import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface ChangeUserImgOutput {
  ok: string;
  error?: string;
}

interface ChangeUserImgIF {
  changeUserImg: ChangeUserImgOutput;
}

const CHANGE_USER_IMG = gql`
  mutation changeUserImg($changeUserImgInput: ChangeUserImgInput!) {
    changeUserImg(input: $changeUserImgInput) {
      ok
      error
    }
  }
`;

function EditImg() {
  const [userImgUrl, setUserImgUrl] = useState("");
  const history = useHistory();
  const [changeUserImg] = useMutation<ChangeUserImgIF>(CHANGE_USER_IMG, {
    variables: {
      changeUserImgInput: {
        userImgUrl,
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await changeUserImg();
      if (data?.changeUserImg.ok) {
        alert("이미지가 변경되었습니다.");
        history.push("/user");
      } else {
        alert(data?.changeUserImg.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type={"file"}
          onChange={(e) => {
            setUserImgUrl(e.currentTarget.value);
          }}
        />
        <button>변경하기</button>
      </form>
    </>
  );
}

export default EditImg;
