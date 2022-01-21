import { useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isFleaOwnerAtom } from "../../atom";
import { DELETE_CHAT } from "../../gql/mutation";
import { IDarams } from "../../interfaces/CommonIF";
import { DeleteChatIF } from "../../interfaces/FleaMarket";

const ChatResetDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const ChatResetBtn = styled.button`
  width: 100px;
  height: 30px;
`;

function ChatLogDelete() {
  const params = useParams<IDarams>();
  const isFleaOwner = useRecoilValue(isFleaOwnerAtom);
  const history = useHistory();
  const room = params.id;
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
        <ChatResetDiv>
          <ChatResetBtn onClick={onClick}>대화 초기화</ChatResetBtn>
        </ChatResetDiv>
      )}
    </>
  );
}
export default ChatLogDelete;
