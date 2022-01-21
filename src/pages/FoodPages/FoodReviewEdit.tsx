import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DELETE_REVIEW, EDIT_REVIEW } from "../../gql/mutation";
import { GET_REVIEW } from "../../gql/query";
import { IDarams } from "../../interfaces/CommonIF";
import {
  DeleteReviewIF,
  EditReviewIF,
  GetReviewIF,
} from "../../interfaces/FoodIF";

export const ReviewEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  outline: ${(props) => props.theme.divOutLineColor};
  width: 80%;
  height: 70vh;
  margin: auto;
  padding: 1%;
`;

export const EditTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
`;

export const EditContent = styled.textarea`
  width: 80%;
  height: 80%;
  margin: auto;
  outline: 1px solid #adb5bd;
  border: 0;
  padding: 1%;
  border-radius: 10px;
`;

export const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5vw;
`;

export const Btn = styled.button`
  font-size: 18px;
`;
function FoodReviewEdit() {
  const params = useParams<IDarams>();
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");

  const { data: reviewData } = useQuery<GetReviewIF>(GET_REVIEW, {
    variables: { getReviewInput: { FoodBoardNo: Number(params.id) } },
  });

  const [editReview] = useMutation<EditReviewIF>(EDIT_REVIEW, {
    variables: {
      editReviewInput: { FoodBoardNo: Number(params.id), date, content },
    },
  });

  const [deleteReview] = useMutation<DeleteReviewIF>(DELETE_REVIEW, {
    variables: { deleteReviewInput: { FoodBoardNo: Number(params.id) } },
  });

  const onEditClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const { data: editData } = await editReview();
      if (editData?.editReview.ok) {
        alert("수정되었습니다.");
        window.location.replace("/food/reviewList");
      } else {
        alert(editData?.editReview.error);
      }
    } catch (error) {}
  };

  const onDeleteClick = async () => {
    try {
      const { data: deleteData } = await deleteReview();
      if (deleteData?.deleteReview.ok) {
        alert("삭제되었습니다.");
        window.location.replace("/food/reviewList");
      } else {
        alert(deleteData?.deleteReview.error);
      }
    } catch (error) {}
  };
  return (
    <>
      <ReviewEditWrapper>
        <EditTitle>{reviewData?.getReview.review?.title}</EditTitle>
        <EditContent
          maxLength={2000}
          defaultValue={reviewData?.getReview.review?.content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <BtnDiv>
          <Btn onClick={onEditClick}>수정하기</Btn>
          <Btn onClick={onDeleteClick}>삭제하기</Btn>
        </BtnDiv>
      </ReviewEditWrapper>
    </>
  );
}

export default FoodReviewEdit;
