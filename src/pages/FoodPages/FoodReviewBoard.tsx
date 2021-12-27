import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FoodBoardLayOut from "../../components/FoodComponents/FoodBoardLayOut";
import Pagination from "../../components/Pagination";

interface Foodboard {
  FoodBoardNo: number;
  category: string;
  title: string;
  date: string;
  view: string;
  userName: string;
}

interface GetFoodReviewListOutput {
  ok: string;
  error?: string;
  review?: Foodboard[];
}

interface GetFoodReviewListIF {
  getFoodReviewList: GetFoodReviewListOutput;
}

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

function FoodReviewBoard() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const history = useHistory();
  const { data: reviewList } =
    useQuery<GetFoodReviewListIF>(GET_FOOD_REVIEW_LIST);
  const allList = reviewList?.getFoodReviewList.review?.filter(
    (item) => item.category === "한식" || "일식" || "양식" || "중식" || "기타"
  );
  const selectList = reviewList?.getFoodReviewList.review?.filter(
    (item) => item.category === category
  );
  const [list, setList] = useState(allList);
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
        <span>{item.title}</span>
        <span>{item.userName}</span>
        <span>{item.date}</span>
        <span>{item.view}</span>
      </div>
    );
  });

  useEffect(() => {
    setList(selectList);
  }, [category]);

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
          <input
            type={"text"}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
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
