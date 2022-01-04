import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import FassionLayOut from "../../components/FassionComponents/FassionLayOut";
import Pagination from "../../components/Pagination";
import { LIKE_REMOVE, LIKE_UPDATE } from "../../gql/mutation";
import { GET_ALL_FASSION_LIST, LIKE_CHECK } from "../../gql/query";
import {
  GetAllFassionListIF,
  LikeCheckIF,
  LikeUpdateIF,
} from "../../interfaces/FassionIF";
import { Img, InfoDiv, StyleDiv } from "./MyStyle";

function OthersStyle() {
  const { data: fassionList } =
    useQuery<GetAllFassionListIF>(GET_ALL_FASSION_LIST);
  const { data: likeList } = useQuery<LikeCheckIF>(LIKE_CHECK);
  const [likeUpdate] = useMutation<LikeUpdateIF>(LIKE_UPDATE);
  const [likeRemove] = useMutation<LikeUpdateIF>(LIKE_REMOVE);

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
        <StyleDiv>
          <li key={item.fassionNo}>
            <InfoDiv>
              <img src={item.userImg} width={20} height={20} alt="프로필" />
            </InfoDiv>
            <Img src={item.imgUrl} alt="이미지" />
            {likeList?.likeCheck.like?.includes(item.fassionNo) ? (
              <div
                style={{ cursor: "pointer", marginTop: "2%" }}
                onClick={async () => {
                  try {
                    await likeRemove({
                      variables: {
                        likeUpdateInput: { fassionNo: item.fassionNo },
                      },
                    });
                    window.location.replace("/fassion/others");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                💗
              </div>
            ) : (
              <div
                style={{ cursor: "pointer", marginTop: "2%" }}
                onClick={async () => {
                  try {
                    await likeUpdate({
                      variables: {
                        likeUpdateInput: { fassionNo: item.fassionNo },
                      },
                    });
                    window.location.replace("/fassion/others");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                🤍
              </div>
            )}
            <div style={{ marginTop: "2%" }}>좋아요 {item.like}개</div>
          </li>
        </StyleDiv>
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
