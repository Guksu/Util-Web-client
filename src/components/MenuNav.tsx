import { useHistory } from "react-router-dom";

function MenuNav() {
  const history = useHistory();
  return (
    <>
      <span
        onClick={() => {
          history.push("/");
        }}
      >
        home
      </span>
    </>
  );
}

export default MenuNav;
