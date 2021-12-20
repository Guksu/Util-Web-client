import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isTempAtom } from "../atom";

function Header() {
  const history = useHistory();
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [temp, setTemp] = useRecoilState(isTempAtom);
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
      <div>다크모드</div>
      <div>
        온도: {temp} /위도 : {lat}/ 경도 : {lon}
      </div>
      <div>메뉴</div>
      <div onClick={() => history.push("/login")}>로그인</div>
    </>
  );
}

export default Header;
