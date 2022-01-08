import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CREATE_REVIEW } from "../../gql/mutation";
import { CreateReviewIF } from "../../interfaces/FoodIF";

const ReviewCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  outline: ${(props) => props.theme.divOutLineColor};
  width: 80%;
  height: 70vh;
  margin: auto;
  padding: 1%;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5vw;
  margin-bottom: 2%;
`;

const TitleInput = styled.input`
  width: 30%;
  height: 3vh;
  outline: 1px solid #adb5bd;
`;

const Select = styled.select`
  width: 150px;
  text-align: center;
  outline: 1px solid #adb5bd;
`;

const TextArea = styled.textarea`
  width: 70%;
  height: 80%;
  margin: auto;
  outline: 1px solid #adb5bd;
  border: 0;
`;

const CreateBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20%;
`;

function FoodReviewCreate() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
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
  useEffect(() => {
    setDate(dateString);
  }, []);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createReview();
      if (data?.createReview.ok) {
        alert("글이 등록되었습니다.");
        window.location.replace("/food/reviewList");
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
