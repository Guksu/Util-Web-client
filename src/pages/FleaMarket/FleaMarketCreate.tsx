import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CREATE_MARKET } from "../../gql/mutation";
import { CreateMarketIF } from "../../interfaces/FleaMarket";
import {
  ReviewCreateWrapper,
  Select,
  TextArea,
  TitleDiv,
  TitleInput,
} from "../FoodPages/FoodReviewCreate";
import { FileInput, FileLabel, FileName } from "../UserPages/EditImg";

const ButtonDiv = styled.div`
  display: flex;
  margin: auto;
  margin-top: 50px;
  gap: 50px;
`;

function FleaMarketCreate() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [file, setFile] = useState<FileList | null>();
  const [fileName, setFileName] = useState("첨부파일");
  const [createMarket] = useMutation<CreateMarketIF>(CREATE_MARKET);

  useEffect(() => {
    if (file) setFileName(file[0].name);
  }, [file]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const actualFile = file[0];
        const formData = new FormData();
        formData.append("file", actualFile);
        const { url: imgUrl } = await (
          await fetch("https://util-web.herokuapp.com/uploads/", {
            method: "POST",
            body: formData,
          })
        ).json();

        const { data } = await createMarket({
          variables: {
            createMarketInput: {
              title,
              category,
              date,
              content,
              productImg: imgUrl,
            },
          },
        });

        if (data?.createMarket.ok) {
          alert("글이 등록되었습니다.");
          window.location.replace("/fleaMarket");
        } else {
          alert(data?.createMarket.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ReviewCreateWrapper>
        <TitleDiv>
          <TitleInput
            placeholder="제목"
            type={"text"}
            required
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <Select
            required
            onChange={(e) => {
              setCategory(e.currentTarget.value);
            }}
          >
            <option value={""}>카테고리 설정</option>
            <option value={"음식"}>음식</option>
            <option value={"의류"}>의류</option>
            <option value={"전자기기"}>전자기기</option>
            <option value={"책"}>책</option>
            <option value={"기타"}>기타</option>
          </Select>
        </TitleDiv>

        <TextArea
          maxLength={2000}
          required
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <ButtonDiv>
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
          <div style={{ marginLeft: "100px" }}>
            <button
              onClick={onClick}
              style={{ width: "70px", height: "40px", fontSize: "15px" }}
            >
              등록하기
            </button>
          </div>
        </ButtonDiv>
      </ReviewCreateWrapper>
    </>
  );
}

export default FleaMarketCreate;
