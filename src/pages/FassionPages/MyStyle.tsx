import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FassionLayOut from "../../components/FassionComponents/FassionLayOut";
import Pagination from "../../components/Pagination";
import { GET_MY_FASSION_LIST } from "../../gql/query";
import { GetMyFassionListIF } from "../../interfaces/FassionIF";

export const StyleDiv = styled.div`
  outline: ${(props) => props.theme.divOutLineColor};
  padding: 5%;
  width: 85%;
`;

export const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10vw;
`;

export const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1%;
`;
export const Img = styled.img`
  width: 300px;
  height: 300px;
`;

const StyleBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15%;
  margin-bottom: 1%;
`;

const StyleBtn = styled.button`
  width: 5vw;
  height: 3vh;
`;
function MyStyle() {
  const history = useHistory();
  const { data: fassionList, refetch } =
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

  useEffect(() => {
    refetch();
  }, [fassionList]);

  const content = currentImg?.map((item) => {
    return (
      <ul key={item.fassionNo}>
        <StyleDiv>
          <li key={item.fassionNo}>
            <InfoDiv>
              <img src={item.userImg} width={20} height={20} alt="프로필" />
            </InfoDiv>
            <ImgDiv>
              <Img src={item.imgUrl} alt="이미지" />
            </ImgDiv>
          </li>
        </StyleDiv>
      </ul>
    );
  });

  return (
    <>
      <StyleBtnDiv>
        <StyleBtn
          onClick={() => {
            history.push("/fassion/uploads");
          }}
        >
          업로드
        </StyleBtn>
      </StyleBtnDiv>
      <FassionLayOut content={content} />
      <Pagination
        perPage={imgPerPage}
        totalPage={fassionList?.getMyFassionList.fassion?.length}
        onClick={paginate}
      />
    </>
  );
}

export default MyStyle;
