interface Props {
  perPage: number;
  totalPage: any;
  onClick: any;
}

function Pagination({ perPage, totalPage, onClick }: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul>
        {pageNumbers.map((item) => (
          <li key={item}>
            <button value={item} onClick={onClick}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Pagination;
