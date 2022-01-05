import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isFoodContentAtom, isFoodNoAtom, isFoodTitleAtom } from "../../atom";
import { GET_REVIEW } from "../../gql/query";
import { GetReviewIF } from "../../interfaces/FoodIF";

const FoodReviewDiv = styled.div`
  outline: #ced4da solid 1px;
  width: 80%;
  height: 90vh;
  margin: auto;
  padding: 1%;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  gap: 3vw;
`;

const ReviewInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: auto;
  margin-top: 1%;
  padding-bottom: 5px;
  font-size: 18px;
`;

const ContentDiv = styled.div`
  width: 90%;
  margin: auto;
  border-top: 1px solid #adb5bd;
  padding-top: 1%;
  font-size: 20px;
  line-height: 150%;
`;

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
      <FoodReviewDiv>
        <TitleDiv>{reviewData?.getReview.review?.title}</TitleDiv>
        <ReviewInfoDiv>
          <div style={{ width: "10vw" }}>
            <img
              src={reviewData?.getReview.review?.userImg}
              alt="유저프로필"
              width={20}
              height={20}
            />
            <span style={{ marginLeft: "5%" }}>
              {reviewData?.getReview.review?.userName}
            </span>
          </div>
          <div
            style={{
              width: "20vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>작성일 : {reviewData?.getReview.review?.date}</span>
            <span style={{ marginLeft: "5%" }}>
              조회 : {reviewData?.getReview.review?.view}
            </span>
            {localStorage.getItem("id") ===
              reviewData?.getReview.review?.userName && (
              <button
                style={{ marginLeft: "5%", fontSize: "15px" }}
                onClick={() => {
                  history.push("/food/review/edit");
                }}
              >
                수정하기
              </button>
            )}
          </div>
        </ReviewInfoDiv>
        <ContentDiv>{reviewData?.getReview.review?.content}</ContentDiv>
      </FoodReviewDiv>
    </>
  );
}

export default FoodReview;
