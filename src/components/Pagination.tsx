import styled from "styled-components";

interface Props {
  perPage: number;
  totalPage: any;
  onClick: any;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1%;
  gap: 5px;
`;

const PaginationBtn = styled.button`
  width: 2vw;
  margin-top: 50%;
  margin-bottom: 100%;
`;

function Pagination({ perPage, totalPage, onClick }: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul>
        <PaginationWrapper>
          {pageNumbers.map((item) => (
            <li key={item}>
              <PaginationBtn value={item} onClick={onClick}>
                {item}
              </PaginationBtn>
            </li>
          ))}
        </PaginationWrapper>
      </ul>
    </>
  );
}

export default Pagination;
