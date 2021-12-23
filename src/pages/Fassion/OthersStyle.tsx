import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import FassionLayOut from "../../components/FassionComponents/FassionLayOut";
import { GetMyFassionListOutput } from "./MyStyle";

interface GetAllFassionListIF {
  getAllFassionList: GetMyFassionListOutput;
}

const GET_ALL_FASSION_LIST = gql`
  query getAllFassionList {
    getAllFassionList {
      ok
      error
      fassion {
        fassionNo
        date
        imgUrl
      }
    }
  }
`;

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
      <FassionLayOut
        content={content}
        perPage={imgPerPage}
        totalPage={fassionList?.getAllFassionList.fassion?.length}
        onClick={paginate}
      />
    </>
  );
}

export default OthersStyle;
