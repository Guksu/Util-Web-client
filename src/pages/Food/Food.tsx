import { useEffect } from "react";

function Food() {
  const kakao = (window as any).kakao;

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div
        id="myMap"
        style={{
          width: "50vw",
          height: "50vh",
        }}
      />
      <div>카테고리</div>
      <div>목록</div>
      <button>후기 게시판 이동</button>
    </>
  );
}

export default Food;
