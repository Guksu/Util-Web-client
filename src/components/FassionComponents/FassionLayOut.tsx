import styled from "styled-components";

interface Props {
  content: any;
}
const LayOuytDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px;
  width: 60%;
  margin: auto;
  @media (max-width: 500px) {
    width: 90vw;
  }
  @media (max-width: 375px) {
    width: 95%;
  }
`;

function FassionLayOut({ content }: Props) {
  return <LayOuytDiv>{content}</LayOuytDiv>;
}

export default FassionLayOut;
