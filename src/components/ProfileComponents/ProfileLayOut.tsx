import styled from "styled-components";

interface Props {
  divName: string;
  btnName: string;
  divContent: any;
  btnOnclick: any;
}

const LayOutDiv = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin: 8% 20%;
`;

const ContentName = styled.span`
  font-size: 25px;
`;

const ContentDiv = styled.div`
  border: 0px solid;
  outline: #ced4da solid 1px;
  padding: 3%;
  display: flex;
  justify-content: space-between;
`;

const LayOutBtn = styled.button`
  width: 6vw;
  height: 3vh;
  min-width: 70px;
  min-height: 40px;
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
