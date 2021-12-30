import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CreateReviewIF } from "../../intefaces/FoodIF";

const CREATE_REVIEW = gql`
  mutation createReview($createReviewInput: CreateReviewInput!) {
    createReview(input: $createReviewInput) {
      ok
      error
    }
  }
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
      <form onSubmit={onSubmit}>
        <input
          placeholder="제목"
          type={"text"}
          required
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <select
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
        </select>

        <textarea
          maxLength={600}
          required
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <button>제출하기</button>
      </form>
    </>
  );
}

export default FoodReviewCreate;
