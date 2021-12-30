import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isFoodNoAtom } from "../../atom";
import FoodBoardLayOut from "../../components/FoodComponents/FoodBoardLayOut";
import Pagination from "../../components/Pagination";
import {
  FoodBoard,
  GetFoodReviewListIF,
  ViewUpdateIF,
} from "../../intefaces/FoodIF";

const GET_FOOD_REVIEW_LIST = gql`
  query getFoodReviewList {
    getFoodReviewList {
      ok
      error
      review {
        FoodBoardNo
        category
        title
        date
        view
        userName
      }
    }
  }
`;

const VIEW_UPDATE = gql`
  mutation viewUpdate($viewUpdateInput: ViewUpadateInput!) {
    viewUpdate(input: $viewUpdateInput) {
      ok
      error
    }
  }
`;

function FoodReviewBoard() {
  const [category, setCategory] = useState("");
  const history = useHistory();
  const isFoodNo = useSetRecoilState(isFoodNoAtom);

  //getFoodReviewList
  const { data: reviewList } =
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
      <div key={item.FoodBoardNo}>
        <span>{item.category}</span>
        <span
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
        </span>
        <span>{item.userName}</span>
        <span>{item.date}</span>
        <span>{item.view}</span>
      </div>
    );
  });

  useEffect(() => {
    setList(selectList);
  }, [category]);

  useEffect(() => {
    setList(allList);
  }, [reviewList]);

  return (
    <>
      <div>
        <span>{` 카테고리`}</span>
        <span>{`   |   `}</span>
        <span
          onClick={() => {
            setList(allList);
          }}
        >{`전체 `}</span>
        <span
          onClick={() => {
            setCategory("한식");
          }}
        >{`한식 `}</span>
        <span
          onClick={() => {
            setCategory("중식");
          }}
        >{`중식 `}</span>
        <span
          onClick={() => {
            setCategory("일식");
          }}
        >{`일식 `}</span>
        <span
          onClick={() => {
            setCategory("양식");
          }}
        >{`양식 `}</span>
        <span
          onClick={() => {
            setCategory("기타");
          }}
        >{`기타`}</span>
        <div>
          <button
            onClick={() => {
              history.push("/food/create");
            }}
          >
            글쓰기
          </button>
          <FoodBoardLayOut content={content} />
          <Pagination
            onClick={paginate}
            perPage={listPerPage}
            totalPage={list?.length}
          />
        </div>
      </div>
    </>
  );
}

export default FoodReviewBoard;
