import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isFleaNoAtom, isFleaOwnerAtom } from "../../atom";
import { DELETE_CHAT } from "../../gql/mutation";
import { DeleteChatIF } from "../../interfaces/FleaMarket";

function ChatLogDelete() {
  const isFleaOwner = useRecoilValue(isFleaOwnerAtom);
  const history = useHistory();
  const room = useRecoilValue(isFleaNoAtom);
  const [deleteChat] = useMutation<DeleteChatIF>(DELETE_CHAT, {
    variables: { deleteChatLogInput: { room } },
  });

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await deleteChat();
      alert("삭제되었습니다");
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isFleaOwner === localStorage.getItem("id") && (
        <button onClick={onClick}>대화 초기화</button>
      )}
    </>
  );
}
export default ChatLogDelete;
