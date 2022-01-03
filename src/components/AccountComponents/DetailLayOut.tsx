import styled from "styled-components";

interface Props {
  typeName: string;
  content: any;
}

const DetailWrapper = styled.div`
  padding: 3%;
  outline: #ced4da solid 1px;
`;

const TypeName = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1%;
  border-bottom: #ced4da solid 1px;
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
