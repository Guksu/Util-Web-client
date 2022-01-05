import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  isDarkThemAtom,
  isLatAtom,
  isLoginAtom,
  isLonAtom,
  isTempAtom,
} from "../atom";
import { PROFILE_INFO } from "../gql/query";
import { ProfileInfoIF } from "../interfaces/UserIF";
import MenuNav from "./MenuNav";
import ProfileNav from "./ProfileComponents/ProfileNav";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3%;
  height: 10vh;
`;

const TogleDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.5vw;
`;

const ProfileTogleDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
`;

const LoginSpan = styled.span`
  padding-left: 3vw;
  cursor: pointer;
`;

const WeatherDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 3%;
`;

function Header() {
  const history = useHistory();
  const [lat, setLat] = useRecoilState(isLatAtom);
  const [lon, setLon] = useRecoilState(isLonAtom);
  const [profileMenuTogle, setProfileMenuTogle] = useState(false);
  const [menuTogle, setMenuTogle] = useState(false);
  const [temp, setTemp] = useRecoilState(isTempAtom);
  const [weatherIcon, setWeatherIcon] = useState("");
  const isLogin = useRecoilValue(isLoginAtom);
  const [isDark, setIsDark] = useRecoilState(isDarkThemAtom);
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
        setWeatherIcon(data.weather[0].icon);
      });
  });

  return (
    <>
      <HeaderDiv>
        <div>
          {isDark === "lightTheme" ? (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.setItem("theme", "darkTheme");
                setIsDark("darkTheme");
              }}
            >
              다크모드
            </span>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.setItem("theme", "lightTheme");
                setIsDark("lightTheme");
              }}
            >
              라이트모드
            </span>
          )}
          <WeatherDiv>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="기상 이미지"
              height={60}
              width={60}
            />
            <span style={{ paddingTop: "2.5vh" }}>{temp}℃</span>
          </WeatherDiv>
        </div>
        <TogleDiv>
          <div
            onClick={() => {
              setMenuTogle(!menuTogle);
            }}
            style={{ width: "50px", cursor: "pointer" }}
          >
            메뉴
          </div>
          <div
            onMouseLeave={() => {
              setMenuTogle(!menuTogle);
            }}
            style={{ marginTop: "0.5vh" }}
          >
            {menuTogle ? <MenuNav /> : <></>}
          </div>
        </TogleDiv>
        {isLogin ? (
          <>
            <ProfileTogleDiv>
              <img
                src={data?.profileInfo.userImgUrl}
                alt="프로필사진"
                onClick={() => {
                  setProfileMenuTogle(!profileMenuTogle);
                }}
                height={70}
                width={70}
                style={{ cursor: "pointer" }}
              />
              <span
                onMouseLeave={() => {
                  setProfileMenuTogle(!profileMenuTogle);
                }}
                style={{ marginTop: "0.5vh" }}
              >
                {profileMenuTogle ? <ProfileNav /> : <></>}
              </span>
            </ProfileTogleDiv>
          </>
        ) : (
          <LoginSpan onClick={() => history.push("/login")}>로그인</LoginSpan>
        )}
      </HeaderDiv>
    </>
  );
}

export default Header;
