import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atom";

const MainDiv = styled.div`
  font-size: 10vh;
  text-align: center;
  margin-top: 10%;
`;

const ContentWraper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  width: 40%;
  min-width: 300px;
  height: 50vh;
  margin: auto;
  border: 1px solid #faf8ff;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 50px;
`;

const ContentDiv = styled.div`
  background-color: ${(props) => props.theme.homeDivColor};
  border-radius: 80%;
  border: 0px;
  width: 5vw;
  height: 8vh;
  min-width: 80px;
  min-height: 80px;
  text-align: center;
  cursor: pointer;
  outline: ${(props) => props.theme.homeOutlineColor};
  margin: auto;
  margin-top: 15%;
`;

const ContentImg = styled.img`
  height: 6vh;
  width: 3vw;
  min-height: 40px;
  min-width: 40px;
  padding-top: 10%;
  margin: 2%;
`;

const ContentName = styled.div`
  margin-top: 5%;
  text-align: center;
  font-size: 20px;
`;

function Home() {
  const isLogin = useRecoilValue(isLoginAtom);
  const history = useHistory();

  return (
    <>
      {isLogin ? (
        <>
          <ContentWraper>
            <div>
              <ContentDiv
                onClick={() => {
                  history.push("/account");
                }}
              >
                <ContentImg
                  alt="가계부"
                  src="https://guksuintengiblemarketuplaodsol6425.s3.ap-northeast-2.amazonaws.com/accounting.png"
                />
              </ContentDiv>
              <ContentName>가계부</ContentName>
            </div>
            <div>
              <ContentDiv
                onClick={() => {
                  history.push("/fassion");
                }}
              >
                <ContentImg
                  alt="스타일"
                  src="https://guksuintengiblemarketuplaodsol6425.s3.ap-northeast-2.amazonaws.com/accessory.png"
                />
              </ContentDiv>
              <ContentName>스타일</ContentName>
            </div>
            <div>
              <ContentDiv
                onClick={() => {
                  history.push("/food");
                }}
              >
                <ContentImg
                  alt="맛집"
                  src="https://guksuintengiblemarketuplaodsol6425.s3.ap-northeast-2.amazonaws.com/restaurant.png"
                />
              </ContentDiv>
              <ContentName>맛집</ContentName>
            </div>
            <div>
              <ContentDiv
                onClick={() => {
                  history.push("/fleaMarket");
                }}
              >
                <ContentImg
                  alt="플리마켓"
                  src="https://guksuintengiblemarketuplaodsol6425.s3.ap-northeast-2.amazonaws.com/market.png"
                />
              </ContentDiv>
              <ContentName>플리마켓</ContentName>
            </div>
          </ContentWraper>
        </>
      ) : (
        <>
          <MainDiv>Login Plz</MainDiv>
        </>
      )}
    </>
  );
}

export default Home;
