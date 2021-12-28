import { gql, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { isFoodNoAtom } from "../../atom";

interface GetReviewOutput {
  ok: string;
  error?: string;
  review?: {
    title: string;
    content: string;
    date: string;
    view: number;
    userName: string;
  };
}

interface GetReviewIF {
  getReview: GetReviewOutput;
}

const GET_REVIEW = gql`
  query getReview($getReviewInput: GetReviewInput!) {
    getReview(input: $getReviewInput) {
      ok
      error
      review {
        title
        content
        date
        view
        userName
      }
    }
  }
`;

function FoodReview() {
  const isFoodNo = useRecoilValue(isFoodNoAtom);
  const { data: reviewData } = useQuery<GetReviewIF>(GET_REVIEW, {
    variables: { getReviewInput: { FoodBoardNo: isFoodNo } },
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
    </>
  );
}

export default FoodReview;
