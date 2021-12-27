interface Props {
  content: any;
}

function FoodBoardLayOut({ content }: Props) {
  return (
    <>
      <div>
        <span>카테고리</span>
        <span>제목</span>
        <span>작성자</span>
        <span>작성일</span>
        <span>조회</span>
      </div>
      <div>{content}</div>
    </>
  );
}

export default FoodBoardLayOut;
