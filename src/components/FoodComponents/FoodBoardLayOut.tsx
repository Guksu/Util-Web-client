import styled from "styled-components";
import { ContentSpan } from "../../pages/FoodPages/FoodReviewBoard";

interface Props {
  content: any;
}

const LayOutDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  gap: 3vw;
  margin-top: 3%;
  margin-bottom: 1%;
  padding-bottom: 1%;
  border-bottom: 1px solid #adb5bd;
`;

function FoodBoardLayOut({ content }: Props) {
  return (
    <>
      <LayOutDiv>
        <ContentSpan>카테고리</ContentSpan>
        <ContentSpan>제목</ContentSpan>
        <ContentSpan>작성자</ContentSpan>
        <ContentSpan>작성일</ContentSpan>
        <ContentSpan>조회</ContentSpan>
      </LayOutDiv>
      <div>{content}</div>
    </>
  );
}

export default FoodBoardLayOut;
