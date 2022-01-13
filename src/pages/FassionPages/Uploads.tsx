import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CREATE_FASSION } from "../../gql/mutation";
import { CreateFassionIF } from "../../interfaces/FassionIF";
import { FileInput, FileLabel, FileName } from "../UserPages/EditImg";

const FassionUploadWrapper = styled.div`
  margin: auto;
  margin-top: 10%;
  outline: ${(props) => props.theme.divOutLineColor};
  width: 30vw;
  height: 20vh;
  min-width: 300px;
`;

const UploadDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20vw;
  margin: auto;
  margin-top: 5%;
`;

function Uploads() {
  const [file, setFile] = useState<FileList | null>();
  const history = useHistory();
  const [fileName, setFileName] = useState("첨부파일");
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [secret, setSecret] = useState("no");
  const [createFassion] = useMutation<CreateFassionIF>(CREATE_FASSION);

  useEffect(() => {
    if (file) setFileName(file[0].name);
  }, [file]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
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

        const { data } = await createFassion({
          variables: { createFassionInput: { date, imgUrl, secret } },
        });
        if (data?.createFassion.ok) {
          alert("등록되었습니다.");
          history.push("/fassion/my");
        } else {
          alert(data?.createFassion.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FassionUploadWrapper>
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
        <InputDiv>
          <select
            required
            onChange={(e) => {
              setSecret(e.currentTarget.value);
            }}
          >
            <option value={""}>게시판 공개여부</option>
            <option value="yes">공개</option>
            <option value="no">비공개</option>
          </select>
          <button style={{ width: "8vw" }} onClick={onClick}>
            등록하기
          </button>
        </InputDiv>
      </FassionUploadWrapper>
    </>
  );
}

export default Uploads;
