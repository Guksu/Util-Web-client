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
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 5px black;
`;

export const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10vw;
  margin-left: 5%;
  margin-bottom: 2%;
`;

export const ImgDiv = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  padding-top: 1%;
`;
export const Img = styled.img`
  width: 400px;
  height: 400px;
  margin-bottom: 2%;
  @media (max-width: 375px) {
    width: 200px;
    height: 300px;
  }
`;

export const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70vw;
  margin-bottom: 20px;
  @media (max-width: 762px) {
    width: 75vw;
  }
  @media (max-width: 535px) {
    width: 85vw;
  }
`;

export const Btn = styled.button`
  width: 5vw;
  height: 3vh;
  min-width: 100px;
  font-size: 15px;
  box-shadow: 0 0 3px black;
`;

export const LikeCountDiv = styled.div`
  color: black;
  margin-top: 2%;
  font-size: 20px;
`;

function MyStyle() {
  const history = useHistory();
  const { data: fassionList, refetch } =
    useQuery<GetMyFassionListIF>(GET_MY_FASSION_LIST);

  //페이지네이션
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

  // 이미지 리스트 가져오기
  const content = currentImg?.map((item) => {
    return (
      <ul key={item.fassionNo}>
        <StyleDiv>
          <li key={item.fassionNo}>
            <InfoDiv>
              <img
                src={item.userImg}
                width={40}
                height={40}
                style={{ borderRadius: "10px" }}
                alt="프로필"
              />
            </InfoDiv>
            <ImgDiv>
              <Img src={item.imgUrl} alt="이미지" />
            </ImgDiv>
            <LikeCountDiv>좋아요 {item.like}개</LikeCountDiv>
          </li>
        </StyleDiv>
      </ul>
    );
  });

  return (
    <>
      <BtnDiv>
        <Btn
          onClick={() => {
            history.push("/fassion/uploads");
          }}
        >
          업로드
        </Btn>
      </BtnDiv>
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
