import styled from "styled-components";

const HomeDiv = styled.div`
  width: 1fr;
  height: 1000px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    :nth-child(3) {
      flex-direction: column-reverse;
    }
    :nth-child(5) {
      flex-direction: column-reverse;
    }
  }
  height: 800px;
`;

const HomeImg = styled.img`
  margin: auto;
  width: auto;
  @media (max-width: 1204px) {
    width: auto;
    height: 55vh;
  }
  @media (max-width: 767px) {
    width: 100vw;
    height: auto;
  }
`;

const TextDiv = styled.div`
  font-size: 30px;
  margin: auto;
  @media (max-width: 1204px) {
    font-size: 20px;
  }
`;
function Home() {
  return (
    <>
      <HomeDiv>
        <HomeImg
          src="https://user-images.githubusercontent.com/87972252/150262599-4e8177ad-351c-4103-b2d0-18a81a1533b8.png"
          alt="account"
        />
        <TextDiv>간편하게 입력하고 손쉽게 관리하세요</TextDiv>
      </HomeDiv>
      <HomeDiv>
        <TextDiv>그날의 패션을 공유해 보세요</TextDiv>
        <HomeImg
          src="https://user-images.githubusercontent.com/87972252/150263161-5f0afaf9-5658-4d9a-ae91-2816d7b55459.png"
          alt="style"
        />
      </HomeDiv>
      <HomeDiv>
        <HomeImg
          src="https://user-images.githubusercontent.com/87972252/150263022-957f1ee6-9339-4b70-9e9a-c9757de78de2.png"
          alt="food"
        />
        <TextDiv>
          내 주변 맛집을 검색하고
          <br />
          <br />
          사람들과 공유해 보세요
        </TextDiv>
      </HomeDiv>
      <HomeDiv>
        <TextDiv>
          중고물품을 등록하고
          <br />
          <br />
          실시간 대화를 통해 거래해 보세요
        </TextDiv>
        <HomeImg
          src="https://user-images.githubusercontent.com/87972252/150262935-d8c0769f-b4d4-4f41-a271-33865c909f38.png"
          alt="fleamarket"
        />
      </HomeDiv>
    </>
  );
}

export default Home;
