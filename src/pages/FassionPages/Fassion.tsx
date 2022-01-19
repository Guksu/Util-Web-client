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
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 5px black;
  padding: 1%;
  outline: ${(props) => props.theme.divOutLineColor};
  background-color: ${(props) => props.theme.backgroundColor};
  @media (max-width: 1024px) {
    width: 50vw;
  }
  @media (max-width: 720px) {
    width: 80vw;
  }
  @media (max-width: 425px) {
    width: 95%;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  margin-top: 5%;
`;

const Img = styled.img`
  height: 300px;
  width: 300px;
  border-radius: 50px;
  @media (max-width: 355px) {
    width: 200px;
    height: 200px;
  }
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
              <Img src={`${imgList[imgNum]?.link}`} alt="이미지 리스트" />
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
        <div style={{ display: "flex", marginBottom: "20px" }}>
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
