import styled from "styled-components";

interface Props {
  divName: string;
  btnName: string;
  divContent: any;
  btnOnclick: any;
}

const LayOutDiv = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 8% 20%;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: 15px;
    margin: 8% 10%;
  }
`;

const ContentName = styled.span`
  font-size: 25px;
`;

const ContentDiv = styled.div`
  border: 0px solid;
  outline: ${(props) => props.theme.divOutLineColor};
  padding: 3%;
  display: flex;
  justify-content: space-between;
  border-radius: 25px;
  background-color: ${(props) => props.theme.backgroundColor};
  @media (max-width: 425px) {
    width: 300px;
  }
  @media (max-width: 375px) {
    width: 280px;
    font-size: 15px;
  }
  @media (max-width: 320px) {
    width: 250px;
    font-size: 15px;
  }
`;

const LayOutBtn = styled.button`
  width: 6vw;
  height: 5vh;
  @media (max-width: 1024px) {
    width: 120px;
    height: 30px;
  }
  @media (max-width: 375px) {
    width: 70px;
    height: 40px;
    font-size: 12px;
  }
`;

function ProfileLayOut({ divName, btnName, divContent, btnOnclick }: Props) {
  return (
    <>
      <LayOutDiv>
        <ContentName>{divName}</ContentName>
        <ContentDiv>
          {divContent}
          <LayOutBtn onClick={btnOnclick}>{btnName}</LayOutBtn>
        </ContentDiv>
      </LayOutDiv>
    </>
  );
}

export default ProfileLayOut;
