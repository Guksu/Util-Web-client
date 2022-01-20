import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isFoodContentAtom, isFoodNoAtom, isFoodTitleAtom } from "../../atom";
import { GET_REVIEW } from "../../gql/query";
import { GetReviewIF } from "../../interfaces/FoodIF";

export const FoodReviewDiv = styled.div`
  outline: ${(props) => props.theme.divOutLineColor};
  width: 80%;
  margin: auto;
  margin-bottom: 5%;
  padding: 1%;
  background-color: ${(props) => props.theme.divBackgroundColor};
  border-radius: 25px;
  height: 70vh;
`;

export const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  gap: 3vw;
  @media (max-width: 768px) {
    margin-top: 3%;
    font-size: 20px;
  }
`;

export const ReviewInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: auto;
  margin-top: 3%;
  padding-bottom: 5px;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ContentDiv = styled.div`
  width: 90%;
  margin: auto;
  border-top: 1px solid #adb5bd;
  padding-top: 1%;
  font-size: 20px;
  line-height: 150%;
  white-space: pre-line;
`;

export const EditBtn = styled.button`
  margin-left: 5%;
  font-size: 15px;
  @media (max-width: 647px) {
    width: 15vw;
  }
  @media (max-width: 551px) {
    font-size: 10px;
  }
  @media (max-width: 425px) {
    width: 300px;
    font-size: 10px;
  }
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
              <EditBtn
                onClick={() => {
                  history.push("/food/review/edit");
                }}
              >
                수정하기
              </EditBtn>
            )}
          </div>
        </ReviewInfoDiv>
        <ContentDiv>{reviewData?.getReview.review?.content}</ContentDiv>
      </FoodReviewDiv>
    </>
  );
}

export default FoodReview;
