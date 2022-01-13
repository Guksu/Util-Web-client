import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CursorDiv } from "../style/GlobalStyle";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 3%;
`;

function MenuNav() {
  const history = useHistory();
  return (
    <>
      <Div>
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
            history.push("/food");
          }}
        >
          맛집
        </CursorDiv>
        <CursorDiv
          onClick={() => {
            history.push("/fleamarket");
          }}
        >
          플리마켓
        </CursorDiv>
      </Div>
    </>
  );
}

export default MenuNav;
