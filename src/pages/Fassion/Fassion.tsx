import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isTempAtom } from "../../atom";
import axios from "axios";

interface ImgIF {
  link: string[];
}

function Fassion() {
  const isTemp = useRecoilValue(isTempAtom);
  const [gender, setGender] = useState("남자");
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
      <div>
        <img
          src={`${imgList[0]?.link}`}
          alt="이미지 리스트"
          height={300}
          width={300}
        />
      </div>
      <div>My Daily</div>
      <div>Other's Daily</div>
    </>
  );
}
export default Fassion;
