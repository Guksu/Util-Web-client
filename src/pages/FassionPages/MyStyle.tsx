import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import FassionLayOut from "../../components/FassionComponents/FassionLayOut";

export interface Fassion {
  fassionNo: number;
  date: string;
  imgUrl: string;
}

export interface GetMyFassionListOutput {
  ok: string;
  error?: string;
  fassion?: Fassion[];
}

interface GetMyFassionListIF {
  getMyFassionList: GetMyFassionListOutput;
}

const GET_MY_FASSION_LIST = gql`
  query getMyFassionList {
    getMyFassionList {
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

function MyStyle() {
  const history = useHistory();
  const { data: fassionList } =
    useQuery<GetMyFassionListIF>(GET_MY_FASSION_LIST);
  const [currentPage, setCurrentPage] = useState(1);
  const [imgPerPage] = useState(9);
  const paginate: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setCurrentPage(parseInt(e.currentTarget.value));
  };
  const lastIndex = currentPage * imgPerPage;
  const firstIndex = lastIndex - imgPerPage;
  const currentImg = fassionList?.getMyFassionList.fassion?.slice(
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
        totalPage={fassionList?.getMyFassionList.fassion?.length}
        onClick={paginate}
      />

      <button
        onClick={() => {
          history.push("/fassion/uploads");
        }}
      >
        업로드
      </button>
    </>
  );
}

export default MyStyle;
