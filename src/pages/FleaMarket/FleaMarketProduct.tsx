import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { GET_MARKET } from "../../gql/query";
import { IDarams } from "../../interfaces/CommonIF";
import { GetMarketIF } from "../../interfaces/FleaMarket";
import {
  ContentDiv,
  EditBtn,
  FoodReviewDiv,
  ReviewInfoDiv,
  TitleDiv,
} from "../FoodPages/FoodReview";

const ChatBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15%;
  margin-right: 5%;
`;
function FleaMarketProduct() {
  const params = useParams<IDarams>();
  const history = useHistory();
  const { data: marketData } = useQuery<GetMarketIF>(GET_MARKET, {
    variables: { getMarketInput: { FleaMarketNo: Number(params.id) } },
  });

  return (
    <>
      <FoodReviewDiv>
        <TitleDiv>{marketData?.getMarket.market.title}</TitleDiv>
        <ReviewInfoDiv>
          <div style={{ width: "10vw" }}>
            <img
              src={marketData?.getMarket.market.userImg}
              alt="유저프로필이미지"
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
              <EditBtn
                onClick={() => {
                  history.push(`/fleamarket/edit/${params.id}`);
                }}
              >
                수정하기
              </EditBtn>
            )}
          </div>
        </ReviewInfoDiv>
        <ContentDiv>
          <img
            alt="상품이미지"
            src={marketData?.getMarket.market.productImg}
            style={{
              width: "200px",
              height: "200px",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          {marketData?.getMarket.market.content}
        </ContentDiv>
        <ChatBtnDiv>
          <button
            onClick={() => {
              history.push(`/fleaMarket/chatroom/${params.id}`);
            }}
            style={{ width: "70px", height: "50px", fontSize: "15px" }}
          >
            판매자 대화하기
          </button>
        </ChatBtnDiv>
      </FoodReviewDiv>
    </>
  );
}

export default FleaMarketProduct;
