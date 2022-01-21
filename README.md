## **Util-Web**

- Demo: https://jovial-minsky-db2ac4.netlify.app
- 체험 아이디1 : min / 비밀번호 : 123123
- 체험 아이디2 : jong / 비밀번호 : 123123

- Server코드 : https://github.com/Guksu/Util-Web-server

## **개발 동기**

다양한 기능을 코드로 구현하고 싶은 생각이 들어 이러한 기능들이 구현된 종합 웹사이트를 개발하게 되었습니다.

## **사용기술 / 라이브러리**

**Client**

- React.js / TypeScript / Graphql / Apollo-client / Recoil
- nivo / Axios / Styled-components / Socket.io-client

**Server**

- NestJS / Graphql / TypeORM / Typescript
- Aws-sdk / Axios / Bcrypt

**API**

- OpenWeather API (실시간 온도 / 기상이미지)
- Daum 지도 API
- Naver 이미지 검색 / 블로그 검색 API

## **프로젝트 구조**

# **ERD**

<img src="https://user-images.githubusercontent.com/87972252/150096948-4231039d-444e-44c2-a5ce-bceb2484a639.png" width={80%}>

# **기능설계도**

<img src="https://user-images.githubusercontent.com/87972252/150099426-3d9a5c2e-6325-4966-8ac8-70ed4b99432e.png" width={80%}>

## **주요기능**

1. **다크모드/라이트모드**

- styled-components의 ThemeProvider를 이용하여 구현했습니다.

  <img src="https://user-images.githubusercontent.com/87972252/150284739-98bc0994-f010-4a82-b478-a5a5c63b049a.png" width={50%}>
  <img src="https://user-images.githubusercontent.com/87972252/150284807-f3269523-16eb-4cc4-a099-e0dad6217ba5.png" width={50%}>

- `Theme작성 코드`

  <img src="https://user-images.githubusercontent.com/87972252/150460049-5a4a1569-7301-4724-9e32-3dceb8494647.png" width={50%}>

2. **가계부기능**

- 유저가 입력한 value를 MySQL에 저장한 뒤 nivo라이브러리를 활용해 원형 차트로 보이도록 하였고, 유저가 원할 시 입력한 내역을 삭제 가능하도록 구현했습니다.
  <img src="https://user-images.githubusercontent.com/87972252/150288106-db90bebd-717c-4dc2-89b6-ed1946de140e.png" width={70%}>

- `가계부입력 코드`

  <img src="https://user-images.githubusercontent.com/87972252/150288522-27659d95-f20f-4a5c-b6a2-5ab180423e35.png" width={50%}>

3. **패션추천 / 게시판기능**

- OpenWeather API를 이용해 유저의 위치와 온도를 확인한 뒤 Naver 이미지 검색 API를 사용하여 해당 온도에 맞는 코디를 추천해 줄 수 있게 구현했습니다.
- 또한, 유저가 게시판에 전체 공개로 코디 컷을 등록할 경우 좋아요 기능이 가능하도록 구현했습니다.

 <img src="https://user-images.githubusercontent.com/87972252/150289556-3bc8735b-74e5-442c-ab67-68cff77cb14d.png" width={50%}>
 <img src="https://user-images.githubusercontent.com/87972252/150289616-8277382a-40ec-498e-8ef0-e132124ea25c.png" width={50%}>

- `온도확인 후 코디추천 코드`

  <img src="https://user-images.githubusercontent.com/87972252/150290101-5c8a6165-57cd-44b1-8da0-5b33f1b51239.png" width={50%}>
  <img src="https://user-images.githubusercontent.com/87972252/150290109-5ae4d626-2f83-4f7f-a993-efbdb60312f7.png" width={50%}>

- `게시판 업로드 코드`

  <img src="https://user-images.githubusercontent.com/87972252/150291004-983426e2-ef42-4442-b71b-0090dbd130ba.png" width={50%}>
  <img src="https://user-images.githubusercontent.com/87972252/150291008-03bbfb53-e6af-456f-9404-429aa190a311.png" width={50%}>

4. **맛집검색 기능**

- 처음 입장 시 OpenWeather API를 통하여 얻은 유저의 위치 정보와 Daum 지도 API를 활용하여 유저의 주변 맛집을 보여준 뒤,
  유저가 원하는 키워드로 검색한 내용을 Naver 블로그 검색 API를 통하여 블로그에 직접 방문할 수 있게 구현했습니다.

  <img src="https://user-images.githubusercontent.com/87972252/150291712-6a2230b1-e8e0-412e-b8c1-e7b0af723ec1.png" width={50%}>

- `맛집검색 코드`

  <img src="https://user-images.githubusercontent.com/87972252/150292329-a4290feb-322e-4175-9536-58338fb85189.png" width={50%}>

5. **플리마켓 기능**

- 유저가 판매하고 싶은 물건을 게시판에 등록할 수 있고 Socket.io를 통하여 실시간 대화를 가능하도록 구현했습니다. 대화 내용은 DB에 저장되며 판매자가 원할 경우 삭제가 가능합니다.

 <img src="https://user-images.githubusercontent.com/87972252/150292818-68ad4b8b-e6cb-4398-b038-4114b6fdc00c.png" width={50%}>

- `채팅기능 코드`

  <img src="https://user-images.githubusercontent.com/87972252/150293369-69f24e04-dabe-492b-aea5-03d081516ff6.png" width={50%}>
  <img src="https://user-images.githubusercontent.com/87972252/150293379-ca54b8ec-856b-48bc-ab0a-8fb246656048.png" width={50%}>

## **프로젝트 진행 후 느낀 점 / 개선할 점**

- React를 어느 정도 잘 활용한다 생각했지만 아직 Hooks를 제대로 활용하지 못하는 거 같아 공식 문서를 통한 공부가 필요함을 느꼈습니다. 또한 재사용 가능한 Components의 중요성을 느꼈으며 Components의 설계를 더 꼼꼼히 해야 함을 배웠습니다.

- 이번 프로젝트를 진행하면서 공식 문서의 중요함을 다시 깨닫게 되었습니다. 실례로 좋아요 기능을 구현하면서 유저가 좋아요 버튼을 클릭하면 바로 렌더링이 될 수 있게 구현함에 있어서 useEffect를 사용해야 하나 고민했지만 Apollo-client의 공식 문서를 찾아보니 refetch 가 존재하는 것을 발견하고 이러한 고민은 쉽게 해결되었습니다. 이 경험을 통해 Apollo-clinet뿐만 아니라 다른 공식 문서도 꼼꼼히 보도록 노력하고 있습니다.

- Graphql과 NestJS를 공부한 뒤 처음으로 프로젝트에 적용시켜봤는데 처음인 만큼 여러 가지 우여곡절이 많았지만 재미있었습니다. Graphql은 REST API에 비하여 비교적 간단하고 편하다고 느껴졌지만 아직 익숙하지 않아 더 공부를 해야 할 필요성을 느꼈습니다. 또한 NestJS를 통하여 Backend의 구조를 더 공부할 수 있었습니다.

- Socket.io를 통하여 실시간 대화를 구현했지만
