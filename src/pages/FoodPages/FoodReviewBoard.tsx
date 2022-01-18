import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isFoodNoAtom } from "../../atom";
import FoodBoardLayOut from "../../components/FoodComponents/FoodBoardLayOut";
import Pagination from "../../components/Pagination";
import { VIEW_UPDATE } from "../../gql/mutation";
import { GET_FOOD_REVIEW_LIST } from "../../gql/query";
import {
  FoodBoard,
  GetFoodReviewListIF,
  ViewUpdateIF,
} from "../../interfaces/FoodIF";

export const FoodBoardDiv = styled.div`
  outline: ${(props) => props.theme.divOutLineColor};
  width: 80%;
  height: 75vh;
  margin: auto;
`;

export const CategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  gap: 3vw;
`;

export const CategorySpan = styled.span`
  cursor: pointer;
`;

export const ReviewBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1%;
  margin-right: 3%;
  height: 3vh;
  flex-wrap: wrap;
`;

export const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2vh;
  gap: 3vw;
  margin-bottom: 1%;
  padding-bottom: 1%;
  border-bottom: ${(props) => props.theme.divOutLineColor}; ;
`;

export const ContentSpan = styled.span`
  width: 10vw;
`;

function FoodReviewBoard() {
  const [category, setCategory] = useState("");
  const history = useHistory();
  const isFoodNo = useSetRecoilState(isFoodNoAtom);

  //getFoodReviewList
  const { data: reviewList, refetch } =
    useQuery<GetFoodReviewListIF>(GET_FOOD_REVIEW_LIST);
  const allList = reviewList?.getFoodReviewList.review?.filter(
    (item) => item.category === "한식" || "일식" || "양식" || "중식" || "기타"
  );
  const selectList = reviewList?.getFoodReviewList.review?.filter(
    (item) => item.category === category
  );
  const [list, setList] = useState<FoodBoard[] | undefined>(allList);

  //viewUpdate
  const [viewUpdate] = useMutation<ViewUpdateIF>(VIEW_UPDATE);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage] = useState(9);
  const paginate: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setCurrentPage(parseInt(e.currentTarget.value));
  };
  const lastIndex = currentPage * listPerPage;
  const firstIndex = lastIndex - listPerPage;
  const currentList = list?.slice(firstIndex, lastIndex);

  const content = currentList?.map((item) => {
    return (
      <ContentDiv key={item.FoodBoardNo}>
        <ContentSpan>{item.category}</ContentSpan>
        <ContentSpan
          style={{ cursor: "pointer" }}
          onClick={async () => {
            try {
              const { data: viewUpdateCheck } = await viewUpdate({
                variables: {
                  viewUpdateInput: { FoodBoardNo: item.FoodBoardNo },
                },
              });
              if (viewUpdateCheck?.viewUpdate.ok) {
                isFoodNo(item.FoodBoardNo);
                history.push("/food/review");
              } else {
                alert(viewUpdateCheck?.viewUpdate.error);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {item.title}
        </ContentSpan>
        <ContentSpan>{item.userName}</ContentSpan>
        <ContentSpan>{item.date}</ContentSpan>
        <ContentSpan>{item.view}</ContentSpan>
      </ContentDiv>
    );
  });

  useEffect(() => {
    setList(selectList);
  }, [category]);

  useEffect(() => {
    setList(allList);
  }, [reviewList]);

  useEffect(() => {
    refetch();
  }, [reviewList]);
  return (
    <>
      <FoodBoardDiv>
        <div style={{ padding: "3%" }}>
          <CategoryDiv>
            <CategorySpan
              onClick={() => {
                setList(allList);
              }}
            >{`전체 `}</CategorySpan>
            <span>{`   |   `}</span>
            <CategorySpan
              onClick={() => {
                setCategory("한식");
              }}
            >{`한식 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("중식");
              }}
            >{`중식 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("일식");
              }}
            >{`일식 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("양식");
              }}
            >{`양식 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("기타");
              }}
            >{`기타`}</CategorySpan>
          </CategoryDiv>
          <ReviewBtnDiv>
            <button
              style={{ width: "70px", height: "40px", fontSize: "15px" }}
              onClick={() => {
                history.push("/food/create");
              }}
            >
              글쓰기
            </button>
          </ReviewBtnDiv>
          <FoodBoardLayOut content={content} />
          <Pagination
            onClick={paginate}
            perPage={listPerPage}
            totalPage={list?.length}
          />
        </div>
      </FoodBoardDiv>
    </>
  );
}

export default FoodReviewBoard;
