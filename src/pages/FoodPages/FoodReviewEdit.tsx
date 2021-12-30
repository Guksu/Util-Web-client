import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isFoodContentAtom, isFoodNoAtom, isFoodTitleAtom } from "../../atom";

interface EditReviewOutput {
  ok: string;
  error?: string;
}

interface EditReviewIF {
  editReview: EditReviewOutput;
}

const EDIT_REVIEW = gql`
  mutation editReview($editReviewInput: EditReviewInput!) {
    editReview(input: $editReviewInput) {
      ok
      error
    }
  }
`;

interface DeleteReviewOutput {
  ok: string;
  error?: string;
}

interface DeleteReviewIF {
  deleteReview: DeleteReviewOutput;
}

const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewInput: DeleteReviewInput!) {
    deleteReview(input: $deleteReviewInput) {
      ok
      error
    }
  }
`;

function FoodReviewEdit() {
  const isFoodNo = useRecoilValue(isFoodNoAtom);
  const isFoodTitle = useRecoilValue(isFoodTitleAtom);
  const isFoodContent = useRecoilValue(isFoodContentAtom);
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  useEffect(() => {
    setDate(dateString);
  }, []);

  const [editReview] = useMutation<EditReviewIF>(EDIT_REVIEW, {
    variables: { editReviewInput: { FoodBoardNo: isFoodNo, date, content } },
  });

  const [deleteReview] = useMutation<DeleteReviewIF>(DELETE_REVIEW, {
    variables: { deleteReviewInput: { FoodBoardNo: isFoodNo } },
  });

  const onEditSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
      <form onSubmit={onEditSubmit}>
        <div>{isFoodTitle}</div>
        <textarea
          maxLength={600}
          defaultValue={isFoodContent}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <button>수정하기</button>
      </form>
      <button onClick={onDeleteClick}>삭제하기</button>
    </>
  );
}

export default FoodReviewEdit;
