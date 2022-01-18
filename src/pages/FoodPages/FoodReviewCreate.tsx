import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CREATE_REVIEW } from "../../gql/mutation";
import { CreateReviewIF } from "../../interfaces/FoodIF";

export const ReviewCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  outline: ${(props) => props.theme.divOutLineColor};
  width: 80%;
  height: 70vh;
  margin: auto;
  padding: 1%;
`;

export const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5vw;
  margin-bottom: 2%;
`;

export const TitleInput = styled.input`
  width: 30%;
  height: 3vh;
  outline: 1px solid #adb5bd;
`;

export const Select = styled.select`
  width: 150px;
  text-align: center;
  outline: 1px solid #adb5bd;
`;

export const TextArea = styled.textarea`
  width: 70%;
  height: 80%;
  margin: auto;
  outline: 1px solid #adb5bd;
  border: 0;
`;

export const CreateBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20%;
`;

function FoodReviewCreate() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [createReview] = useMutation<CreateReviewIF>(CREATE_REVIEW, {
    variables: {
      createReviewInput: {
        title,
        category,
        date,
        content,
      },
    },
  });

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createReview();
      if (data?.createReview.ok) {
        alert("글이 등록되었습니다.");
        history.push("/food/reviewList");
      } else {
        alert(data?.createReview.error);
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
            <option value={"한식"}>한식</option>
            <option value={"중식"}>중식</option>
            <option value={"일식"}>일식</option>
            <option value={"양식"}>양식</option>
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
        <CreateBtnDiv>
          <button
            onClick={onClick}
            style={{ width: "70px", height: "40px", fontSize: "15px" }}
          >
            등록하기
          </button>
        </CreateBtnDiv>
      </ReviewCreateWrapper>
    </>
  );
}

export default FoodReviewCreate;
