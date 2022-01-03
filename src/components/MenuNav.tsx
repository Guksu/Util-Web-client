import { useHistory } from "react-router-dom";
import { CursorDiv } from "../style/GlobalStyle";

function MenuNav() {
  const history = useHistory();
  return (
    <>
      <CursorDiv
        onClick={() => {
          history.push("/");
        }}
      >
        메인
      </CursorDiv>
      <CursorDiv
        onClick={() => {
          history.push("/account");
        }}
      >
        가계부
      </CursorDiv>
      <CursorDiv
        onClick={() => {
          history.push("/fassion");
        }}
      >
        스타일
      </CursorDiv>
      <CursorDiv
        onClick={() => {
          history.push("//food");
        }}
      >
        맛집
      </CursorDiv>
    </>
  );
}

export default MenuNav;
