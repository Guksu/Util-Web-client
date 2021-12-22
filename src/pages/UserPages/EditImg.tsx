import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

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
  const [file, setFile] = useState<FileList | null>();
  const [changeUserImg] = useMutation<ChangeUserImgIF>(CHANGE_USER_IMG);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const actualFile = file[0];
        const formData = new FormData();
        formData.append("file", actualFile);
        const { url: imgUrl } = await (
          await fetch("http://localhost:4000/uploads/", {
            method: "POST",
            body: formData,
          })
        ).json();

        const { data } = await changeUserImg({
          variables: {
            changeUserImgInput: {
              userImgUrl: imgUrl,
            },
          },
        });

        if (data?.changeUserImg.ok) {
          alert("이미지가 변경되었습니다.");
          window.location.replace("/user");
        } else {
          alert(data?.changeUserImg.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.currentTarget.files);
          }}
        />
        <button>변경하기</button>
      </form>
    </>
  );
}

export default EditImg;
