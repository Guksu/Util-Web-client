import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLatAtom, isLonAtom } from "../../atom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Btn, BtnDiv } from "../FassionPages/MyStyle";

const MapDiv = styled.div`
  outline: ${(props) => props.theme.divOutLineColor};
  width: 50%;
  height: 1fr;
  margin: auto;
  background-color: ${(props) => props.theme.divBackgroundColor};
  border-radius: 20px;
  position: relative;
  box-shadow: 0 0 5px black;
  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const InputSpan = styled.span`
  display: flex;
  justify-content: center;
  padding-top: 2%;
`;

const Map = styled.div`
  margin: auto;
  margin-top: 3%;
  width: 30vw;
  height: 50vh;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
  @media (max-width: 1024px) {
    width: 60vw;
    height: 30vh;
  }
`;

const FoodList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px;
  padding: 5% 0;
  cursor: pointer;
  font-size: 15px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 3%;

  @media (max-width: 539px) {
    font-size: 12px;
  }
  @media (max-width: 375px) {
    font-size: 10px;
    font-weight: bold;
  }
`;

const KeywordInput = styled.input`
  outline: 1px solid #adb5bd;
`;

function Food() {
  const kakao = (window as any).kakao;
  const isLat = useRecoilValue(isLatAtom);
  const isLon = useRecoilValue(isLonAtom);
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();
    var callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setKeyword(`${result[0].address_name} 맛집`);
      }
    };

    geocoder.coord2RegionCode(isLon, isLat, callback);
  }, [isLat, isLon]);

  useEffect(() => {
    let markers: any = [];
    const geo = new kakao.maps.LatLng(isLat, isLon);
    const options = {
      center: geo,
      level: 3,
    };
    const container = document.getElementById("map");
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    searchPlaces();

    function searchPlaces() {
      // 장소검색 객체를 통해 키워드로 장소검색을 요청
      const options = {
        size: 9,
      };
      ps.keywordSearch(keyword, placesSearchCB, options);
    }
    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색 목록과 마커를 표출
        displayPlaces(data);
        // 페이지 번호를 표출
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places: any) {
      const listEl: any = document.getElementById("placesList");
      const fragment = document.createDocumentFragment();
      const bounds = new kakao.maps.LatLngBounds();

      // 검색 결과 목록에 추가된 항목들을 제거
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i, "");
        const itemEl = getListItem(i, places[i]);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시
        // mouseout 했을 때는 인포윈도우를 닫기
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가
      listEl.appendChild(fragment);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(index: any, places: any) {
      const el = document.createElement("li");
      const place = places.place_name;
      const getName = async () => {
        try {
          const {
            data: { items },
          } = await axios.get("https://util-web.herokuapp.com/foodInfo/", {
            params: { place },
          });
          window.open(items[0].link);
        } catch (error) {
          console.log(error);
        }
      };

      let itemStr =
        "▪ " +
        place +
        "<br/>" +
        "<br/>" +
        "&nbsp;" +
        places.category_name.slice(5, 9) +
        "<br/>" +
        "<br/>" +
        "&nbsp;" +
        "&nbsp;" +
        places.address_name;

      el.innerHTML = itemStr;
      el.onclick = getName;
      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position: any, idx: any, title: any) {
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url
      const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };
      const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination: any) {
      const paginationEl: any = document.getElementById("pagination");
      const fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement("button");
        el.innerHTML = i.toString();

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    // 인포윈도우에 장소명을 표시
    function displayInfowindow(marker: any, title: any) {
      const content =
        '<div style="padding:5px;z-index:1;color:#495057">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수
    function removeAllChildNods(el: any) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, [isLat, isLon, keyword]);

  return (
    <>
      <BtnDiv>
        <Btn
          onClick={() => {
            history.push("/food/reviewList");
          }}
        >
          후기 게시판
        </Btn>
      </BtnDiv>
      <MapDiv>
        <InputSpan>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <KeywordInput
              id="keyword"
              placeholder="음식점 검색"
              onChange={(e) => {
                setKeyword(e.currentTarget.value);
              }}
            />
          </form>
        </InputSpan>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            padding: "0 5%",
          }}
        >
          <Map id="map" />
          <FoodList id="placesList"></FoodList>
        </div>
        <span
          id="pagination"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginTop: "2%",
            paddingBottom: "3%",
          }}
        />
      </MapDiv>
    </>
  );
}

export default Food;
