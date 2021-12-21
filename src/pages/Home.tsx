import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../atom";

function Home() {
  const isLogin = useRecoilValue(isLoginAtom);
  const history = useHistory();

  return (
    <>
      <h1>Util Web</h1>
      {isLogin ? (
        <div
          onClick={() => {
            history.push("/account");
          }}
        >
          가계부
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Home;
