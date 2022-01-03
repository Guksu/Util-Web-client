import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CHANGE_USER_IMG } from "../../gql/mutation";
import { ChangeUserImgIF } from "../../interfaces/UserIF";

const EditDiv = styled.div`
  margin: auto;
  margin-top: 5%;
  outline: #dee2e6 solid 1px;
  width: 30vw;
  height: 20vh;
  min-width: 300px;
`;

const UploadDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5%;
`;

const FileName = styled.input`
  display: inline-block;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  color: #999999;
  width: 15vw;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  margin-left: 10px;
`;

const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const UploadBtn = styled.button`
  width: 8vw;
  min-width: 70px;
  margin-top: 10%;
  margin-left: 30%;
`;

function EditImg() {
  const [file, setFile] = useState<FileList | null>();
  const [fileName, setFileName] = useState("첨부파일");
  const [changeUserImg] = useMutation<ChangeUserImgIF>(CHANGE_USER_IMG);

  useEffect(() => {
    if (file) setFileName(file[0].name);
  }, [file]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
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
      <EditDiv>
        <UploadDiv>
          <FileName placeholder={fileName} disabled />
          <FileLabel htmlFor="file">파일찾기</FileLabel>
          <FileInput
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.currentTarget.files);
            }}
          />
        </UploadDiv>
        <UploadBtn onClick={onClick}>변경하기</UploadBtn>
      </EditDiv>
    </>
  );
}

export default EditImg;
