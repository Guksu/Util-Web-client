import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isFleaNoAtom } from "../../atom";
import FoodBoardLayOut from "../../components/FoodComponents/FoodBoardLayOut";
import Pagination from "../../components/Pagination";
import { CommonOutput } from "../../interfaces/CommonIF";
import {
  CategoryDiv,
  CategorySpan,
  ContentDiv,
  ContentSpan,
  FoodBoardDiv,
  ReviewBtnDiv,
} from "../FoodPages/FoodReviewBoard";

export interface FleaMarket {
  FleaMarketNo: number;
  title: string;
  content: string;
  date: string;
  view: number;
  userImg: string;
  productImg: string;
  userName: string;
  category: string;
}

interface GetMarketListOutput extends CommonOutput {
  market: FleaMarket[];
}

interface GetMarketListIF {
  getMarketList: GetMarketListOutput;
}

const GET_MARKET_LIST = gql`
  query getMarketList {
    getMarketList {
      ok
      error
      market {
        title
        view
        userName
        date
        category
        FleaMarketNo
      }
    }
  }
`;

interface MarketViewUpdateIF {
  marketViewUpdate: CommonOutput;
}

const MARKET_VIEW_UPDATE = gql`
  mutation marketViewUpdate($marketViewUpdateInput: MarketViewUpdateInput!) {
    marketViewUpdate(input: $marketViewUpdateInput) {
      ok
      error
    }
  }
`;

function FleaMarketHome() {
  const history = useHistory();
  const [category, setCategory] = useState("");
  const isFleaNo = useSetRecoilState(isFleaNoAtom);
  const { data: marketList } = useQuery<GetMarketListIF>(GET_MARKET_LIST);
  const [marketViewUpdate] =
    useMutation<MarketViewUpdateIF>(MARKET_VIEW_UPDATE);

  const allList = marketList?.getMarketList.market?.filter(
    (item) => item.category === "음식" || "의류" || "전자기기" || "책" || "기타"
  );
  const selectList = marketList?.getMarketList.market?.filter(
    (item) => item.category === category
  );
  const [list, setList] = useState<FleaMarket[] | undefined>(allList);

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
      <ContentDiv key={item.FleaMarketNo}>
        <ContentSpan>{item.category}</ContentSpan>
        <ContentSpan
          style={{ cursor: "pointer" }}
          onClick={async () => {
            try {
              const { data: viewUpdateCheck } = await marketViewUpdate({
                variables: {
                  marketViewUpdateInput: { FleaMarketNo: item.FleaMarketNo },
                },
              });
              if (viewUpdateCheck?.marketViewUpdate.ok) {
                isFleaNo(item.FleaMarketNo);
                history.push("/fleaMarket/product");
              } else {
                alert(viewUpdateCheck?.marketViewUpdate.error);
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
  }, [marketList]);

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
            <CategorySpan>{`   |   `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("음식");
              }}
            >{`음식 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("의류");
              }}
            >{`의류 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("전자기기");
              }}
            >{`전자기기 `}</CategorySpan>
            <CategorySpan
              onClick={() => {
                setCategory("책");
              }}
            >{`책 `}</CategorySpan>
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
                history.push("/fleaMarket/create");
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

export default FleaMarketHome;
