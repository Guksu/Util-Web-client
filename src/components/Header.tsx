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
import MobileNav from "./MobileNav";
import ProfileNav from "./ProfileComponents/ProfileNav";

const HeaderDiv = styled.div`
  display: flex;
  height: 100px;
  margin: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  justify-content: space-evenly;
  font-size: 22px;
  position: sticky;
  z-index: 5;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 4px 4px -4px black;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const TitleDiv = styled.div``;

const MainNavDiv = styled.div`
  display: flex;
  gap: 60px;
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 3%;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

const SidNavDiv = styled.div``;

const ProfileTogleDiv = styled.div`
  width: 60px;
`;

const WeatherDiv = styled.div`
  display: flex;
  margin-top: 10px;
`;
const LoginSpan = styled.span`
  cursor: pointer;
`;

function Header() {
  const history = useHistory();
  const [lat, setLat] = useRecoilState(isLatAtom);
  const [lon, setLon] = useRecoilState(isLonAtom);
  const [profileMenuTogle, setProfileMenuTogle] = useState(false);
  const [temp, setTemp] = useRecoilState(isTempAtom);
  const [weatherIcon, setWeatherIcon] = useState("");
  const isLogin = useRecoilValue(isLoginAtom);
  const [isDark, setIsDark] = useRecoilState(isDarkThemAtom);
  const { data, refetch } = useQuery<ProfileInfoIF>(PROFILE_INFO);
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
    refetch();
  });

  return (
    <>
      <HeaderDiv>
        <MobileNav />
        <TitleDiv>UtilWeb</TitleDiv>
        <MainNavDiv>
          <MenuNav />
          {isLogin ? (
            <>
              <ProfileTogleDiv>
                <img
                  src={data?.profileInfo.userImgUrl}
                  alt="???????????????"
                  onClick={() => {
                    setProfileMenuTogle(!profileMenuTogle);
                  }}
                  height={60}
                  width={60}
                  style={{ cursor: "pointer", borderRadius: "35px" }}
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
            <LoginSpan onClick={() => history.push("/login")}>?????????</LoginSpan>
          )}
        </MainNavDiv>
        <SidNavDiv>
          <div>
            {isDark === "lightTheme" ? (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.setItem("theme", "darkTheme");
                  setIsDark("darkTheme");
                }}
              >
                ????????????
              </span>
            ) : (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.setItem("theme", "lightTheme");
                  setIsDark("lightTheme");
                }}
              >
                ???????????????
              </span>
            )}
          </div>
          <WeatherDiv>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="?????? ?????????"
              width={60}
            />
            <span style={{ paddingTop: "2vh" }}>{temp}???</span>
          </WeatherDiv>
        </SidNavDiv>
      </HeaderDiv>
    </>
  );
}

export default Header;
