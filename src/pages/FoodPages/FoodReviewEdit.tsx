import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isFoodContentAtom, isFoodNoAtom, isFoodTitleAtom } from "../../atom";
import { DELETE_REVIEW, EDIT_REVIEW } from "../../gql/mutation";
import { DeleteReviewIF, EditReviewIF } from "../../interfaces/FoodIF";

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
  const isFoodNo = useRecoilValue(isFoodNoAtom);
  const isFoodTitle = useRecoilValue(isFoodTitleAtom);
  const isFoodContent = useRecoilValue(isFoodContentAtom);
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");

  const [editReview] = useMutation<EditReviewIF>(EDIT_REVIEW, {
    variables: { editReviewInput: { FoodBoardNo: isFoodNo, date, content } },
  });

  const [deleteReview] = useMutation<DeleteReviewIF>(DELETE_REVIEW, {
    variables: { deleteReviewInput: { FoodBoardNo: isFoodNo } },
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
        <EditTitle>{isFoodTitle}</EditTitle>
        <EditContent
          maxLength={2000}
          defaultValue={isFoodContent}
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
