import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLatAtom, isLoginAtom, isLonAtom, isTempAtom } from "../atom";
import { ProfileInfoIF } from "../pages/UserPages/Profile";
import ProfileNav from "./ProfileComponents/ProfileNav";

const PROFILE_INFO = gql`
  query profileInfo {
    profileInfo {
      ok
      error
      userImgUrl
    }
  }
`;

function Header() {
  const history = useHistory();
  const [lat, setLat] = useRecoilState(isLatAtom);
  const [lon, setLon] = useRecoilState(isLonAtom);
  const [profileMenuTogle, setProfileMenuTogle] = useState(false);
  const [temp, setTemp] = useRecoilState(isTempAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const { data } = useQuery<ProfileInfoIF>(PROFILE_INFO);
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const geoCheck = (pos: any) => {
    setLat(pos.coords.latitude);
    setLon(pos.coords.longitude);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoCheck);
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => {
        setTemp(Math.ceil(data.main.temp));
      });
  });

  return (
    <>
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        메인이동
      </div>
      <div>다크모드</div>
      <div>
        온도: {temp} /위도 : {lat}/ 경도 : {lon}
      </div>
      <div>메뉴</div>
      {isLogin ? (
        <>
          <img
            src={data?.profileInfo.userImgUrl}
            alt="프로필사진"
            onClick={() => {
              setProfileMenuTogle(!profileMenuTogle);
            }}
            height={100}
            width={100}
          />
          <div
            onMouseLeave={() => {
              setProfileMenuTogle(!profileMenuTogle);
            }}
          >
            {profileMenuTogle ? <ProfileNav /> : <></>}
          </div>
        </>
      ) : (
        <div onClick={() => history.push("/login")}>로그인</div>
      )}
    </>
  );
}

export default Header;
