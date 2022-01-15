import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isFleaContentAtom, isFleaNoAtom, isFleaTitleAtom } from "../../atom";
import { GET_MARKET } from "../../gql/query";
import { GetMarketIF } from "../../interfaces/FleaMarket";
import {
  ContentDiv,
  FoodReviewDiv,
  ReviewInfoDiv,
  TitleDiv,
} from "../FoodPages/FoodReview";
import { CreateBtnDiv } from "../FoodPages/FoodReviewCreate";

function FleaMarketProduct() {
  const isFleaNo = useRecoilValue(isFleaNoAtom);
  const isFleaTitle = useSetRecoilState<any>(isFleaTitleAtom);
  const isFlaeContent = useSetRecoilState<any>(isFleaContentAtom);

  const history = useHistory();
  const { data: marketData } = useQuery<GetMarketIF>(GET_MARKET, {
    variables: { getMarketInput: { FleaMarketNo: isFleaNo } },
  });

  useEffect(() => {
    isFleaTitle(marketData?.getMarket.market?.title);
    isFlaeContent(marketData?.getMarket.market.content);
  });

  return (
    <>
      <FoodReviewDiv>
        <TitleDiv>{marketData?.getMarket.market.title}</TitleDiv>
        <ReviewInfoDiv>
          <div style={{ width: "10vw" }}>
            <img
              src={marketData?.getMarket.market.userImg}
              alt="유저프로필"
              width={20}
              height={20}
            />
            <span style={{ marginLeft: "5%" }}>
              {marketData?.getMarket.market.userName}
            </span>
          </div>
          <div
            style={{
              width: "20vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>작성일 : {marketData?.getMarket.market.date}</span>
            <span style={{ marginLeft: "5%" }}>
              조회 : {marketData?.getMarket.market.view}
            </span>
            {localStorage.getItem("id") ===
              marketData?.getMarket.market.userName && (
              <button
                style={{ marginLeft: "5%", fontSize: "15px" }}
                onClick={() => {
                  history.push("/fleamarket/edit");
                }}
              >
                수정하기
              </button>
            )}
          </div>
        </ReviewInfoDiv>
        <ContentDiv>
          <img
            alt="상품이미지"
            src={marketData?.getMarket.market.productImg}
            style={{
              width: "100px",
              height: "100px",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          {marketData?.getMarket.market.content}
        </ContentDiv>
        <CreateBtnDiv>
          <button
            onClick={() => {
              history.push("/fleaMarket/chatroom");
            }}
            style={{ width: "70px", height: "50px", fontSize: "15px" }}
          >
            판매자 대화하기
          </button>
        </CreateBtnDiv>
      </FoodReviewDiv>
    </>
  );
}

export default FleaMarketProduct;
