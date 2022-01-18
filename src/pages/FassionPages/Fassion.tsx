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
  border-radius: 10px;
  padding: 1%;
  outline: ${(props) => props.theme.divOutLineColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;

const ImgDiv = styled.div`
  display: flex;
`;

const ImgBtn = styled.div`
  margin: auto;
  cursor: pointer;
  padding: 0 1%;
`;

const ArrowDiv = styled.div`
  color: ${(props) => props.theme.backgroundColor};
  margin: auto;
  padding: 0 1%;
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
  min-width: 150px;
  text-align: center;
  font-size: 20px;
  margin-top: 3%;
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
      } = await axios.get("https://util-web.herokuapp.com/fassionList/", {
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
          {imgNum > 0 ? (
            <ImgBtn
              onClick={() => {
                imgNum !== 0 && setImgNum(imgNum - 1);
              }}
            >
              ◀
            </ImgBtn>
          ) : (
            <ArrowDiv>◀</ArrowDiv>
          )}
          <div>
            <div>
              <img
                src={`${imgList[imgNum]?.link}`}
                alt="이미지 리스트"
                height={300}
                width={300}
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  marginTop: "2%",
                }}
              >{`<오늘의 코디>`}</div>
            </div>
          </div>
          {imgNum < imgList.length - 1 ? (
            <ImgBtn
              onClick={() => {
                imgNum < imgList.length - 1 && setImgNum(imgNum + 1);
              }}
            >
              ▶
            </ImgBtn>
          ) : (
            <ArrowDiv>▶</ArrowDiv>
          )}
        </ImgDiv>
        <BtnDiv>
          <button
            style={{ fontSize: "15px" }}
            value="남자"
            onClick={(e) => {
              setGender(e.currentTarget.value);
            }}
          >
            남성
          </button>
          <button
            style={{ fontSize: "15px" }}
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
