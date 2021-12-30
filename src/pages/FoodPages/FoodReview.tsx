import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isFoodContentAtom, isFoodNoAtom, isFoodTitleAtom } from "../../atom";
import { GET_REVIEW } from "../../gql/query";
import { GetReviewIF } from "../../interfaces/FoodIF";

function FoodReview() {
  const isFoodNo = useRecoilValue(isFoodNoAtom);
  const isFoodTitle = useSetRecoilState<any>(isFoodTitleAtom);
  const isFoodContent = useSetRecoilState<any>(isFoodContentAtom);

  const history = useHistory();
  const { data: reviewData } = useQuery<GetReviewIF>(GET_REVIEW, {
    variables: { getReviewInput: { FoodBoardNo: isFoodNo } },
  });

  useEffect(() => {
    isFoodTitle(reviewData?.getReview.review?.title);
    isFoodContent(reviewData?.getReview.review?.content);
  });
  return (
    <>
      <div>
        <span>{reviewData?.getReview.review?.title}</span>
        <span>{reviewData?.getReview.review?.date}</span>
      </div>
      <div>
        <span>작성자 : {reviewData?.getReview.review?.userName}</span>
        <span>조회 수 : {reviewData?.getReview.review?.view}</span>
      </div>
      <div>{reviewData?.getReview.review?.content}</div>
      {localStorage.getItem("id") ===
        reviewData?.getReview.review?.userName && (
        <button
          onClick={() => {
            history.push("/food/review/edit");
          }}
        >
          수정하기
        </button>
      )}
    </>
  );
}

export default FoodReview;
