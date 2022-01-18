import styled from "styled-components";

interface Props {
  content: any;
}
const LayOuytDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
  width: 80%;
  margin: auto;
`;

function FassionLayOut({ content }: Props) {
  return <LayOuytDiv>{content}</LayOuytDiv>;
}

export default FassionLayOut;
