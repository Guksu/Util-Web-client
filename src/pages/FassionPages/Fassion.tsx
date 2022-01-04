import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isTempAtom } from "../../atom";
import axios from "axios";
import { ImgIF } from "../../interfaces/FassionIF";
import styled from "styled-components";

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  min-width: 360px;
  margin: auto;
  margin-top: 5%;
  padding: 1%;
  outline: #ced4da solid 1px;
`;

const ImgDiv = styled.div`
  display: flex;
`;

const ImgBtn = styled.div`
  margin: auto;
  cursor: pointer;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 5vw;
  min-width: 100px;
  margin: 2%;
`;

const DailyDiv = styled.div`
  cursor: pointer;
  width: 5vw;
  min-width: 100px;
  text-align: center;
`;

function Fassion() {
  const isTemp = useRecoilValue(isTempAtom);
  const [gender, setGender] = useState("남자");
  const [imgNum, setImgNum] = useState(0);
  const history = useHistory();
  const [imgList, setImgList] = useState<ImgIF[]>([]);

  const getImg = async () => {
    try {
      const {
        data: { items },
      } = await axios.get("http://localhost:4000/fassionList/", {
        params: { isTemp, gender },
      });
      setImgList(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImg();
  }, [gender]);

  return (
    <>
      <ImgWrapper>
        <ImgDiv>
          <ImgBtn
            onClick={() => {
              imgNum !== 0 && setImgNum(imgNum - 1);
            }}
          >
            ◀
          </ImgBtn>
          <div>
            <div>
              <img
                src={`${imgList[imgNum]?.link}`}
                alt="이미지 리스트"
                height={300}
                width={300}
                style={{ borderRadius: "50%" }}
              />
              <div style={{ textAlign: "center" }}>{`<오늘의 코디>`}</div>
            </div>
          </div>
          <ImgBtn
            onClick={() => {
              imgNum < imgList.length - 1 && setImgNum(imgNum + 1);
            }}
          >
            ▶
          </ImgBtn>
        </ImgDiv>
        <BtnDiv>
          <button
            value="남자"
            onClick={(e) => {
              setGender(e.currentTarget.value);
            }}
          >
            남성
          </button>
          <button
            value="여자"
            onClick={(e) => {
              setGender(e.currentTarget.value);
            }}
          >
            여성
          </button>
        </BtnDiv>
        <div style={{ display: "flex" }}>
          <DailyDiv
            onClick={() => {
              history.push("/fassion/my");
            }}
          >
            My Daily
          </DailyDiv>
          <DailyDiv
            onClick={() => {
              history.push("/fassion/others");
            }}
          >
            Other's Daily
          </DailyDiv>
        </div>
      </ImgWrapper>
    </>
  );
}
export default Fassion;
