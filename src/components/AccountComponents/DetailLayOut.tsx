import styled from "styled-components";

interface Props {
  typeName: string;
  content: any;
}

const DetailWrapper = styled.div`
  padding: 3%;
  outline: ${(props) => props.theme.divOutLineColor};
`;

const TypeName = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1%;
  border-bottom: ${(props) => props.theme.divOutLineColor};
  font-size: 20px;
`;

function DetailLayOut({ typeName, content }: Props) {
  return (
    <>
      <DetailWrapper>
        <TypeName>{typeName}</TypeName>
        {content}
      </DetailWrapper>
    </>
  );
}

export default DetailLayOut;
