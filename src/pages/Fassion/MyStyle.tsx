import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import FassionLayOut from "../../components/FassionComponents/FassionLayOut";

interface Fassion {
  fassionNo: number;
  date: string;
  imgUrl: string;
}

interface GetMyFassionListOutput {
  ok: string;
  error?: string;
  fassion?: Fassion[];
}

interface GetMyFassionListIF {
  getMyFassionList: GetMyFassionListOutput;
}

const GET_MY_FASSION_LIST = gql`
  query getMyFassionList {
    getMyFassionList {
      ok
      error
      fassion {
        fassionNo
        date
        imgUrl
      }
    }
  }
`;

function MyStyle() {
  const history = useHistory();
  const { data: fassionList } =
    useQuery<GetMyFassionListIF>(GET_MY_FASSION_LIST);

  const content = fassionList?.getMyFassionList.fassion?.map((item) => {
    return (
      <ul key={item.fassionNo}>
        <li key={item.fassionNo}>
          <div>
            <div>{item.date}</div>
            <img src={item.imgUrl} alt="이미지" height={200} width={200} />
          </div>
        </li>
      </ul>
    );
  });
  return (
    <>
      <FassionLayOut content={content} />
      <button
        onClick={() => {
          history.push("/fassion/uploads");
        }}
      >
        업로드
      </button>
    </>
  );
}

export default MyStyle;
