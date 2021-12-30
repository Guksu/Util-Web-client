import { useQuery } from "@apollo/client";
import { useState } from "react";
import FassionLayOut from "../../components/FassionComponents/FassionLayOut";
import Pagination from "../../components/Pagination";
import { GET_ALL_FASSION_LIST } from "../../gql/query";
import { GetAllFassionListIF } from "../../interfaces/FassionIF";

function OthersStyle() {
  const { data: fassionList } =
    useQuery<GetAllFassionListIF>(GET_ALL_FASSION_LIST);

  const [currentPage, setCurrentPage] = useState(1);
  const [imgPerPage] = useState(9);
  const paginate: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setCurrentPage(parseInt(e.currentTarget.value));
  };

  const lastIndex = currentPage * imgPerPage;
  const firstIndex = lastIndex - imgPerPage;
  const currentImg = fassionList?.getAllFassionList.fassion?.slice(
    firstIndex,
    lastIndex
  );

  const content = currentImg?.map((item) => {
    return (
      <ul key={item.fassionNo}>
        <li key={item.fassionNo}>
          <div>
            <div>{item.date}</div>
            <img src={item.imgUrl} alt="이미지" height={200} width={200} />
          </div>
        </li>
      </ul>
    );
  });
  return (
    <>
      <FassionLayOut content={content} />
      <Pagination
        perPage={imgPerPage}
        totalPage={fassionList?.getAllFassionList.fassion?.length}
        onClick={paginate}
      />
    </>
  );
}

export default OthersStyle;
