import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { DELETE_CHAT } from "../../gql/mutation";
import { GET_MARKET } from "../../gql/query";
import { IDarams } from "../../interfaces/CommonIF";
import { DeleteChatIF, GetMarketIF } from "../../interfaces/FleaMarket";

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
  const history = useHistory();
  const room = Number(params.id);
  const [deleteChat] = useMutation<DeleteChatIF>(DELETE_CHAT, {
    variables: { deleteChatLogInput: { room } },
  });

  const { data: marketData } = useQuery<GetMarketIF>(GET_MARKET, {
    variables: { getMarketInput: { FleaMarketNo: Number(params.id) } },
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
      {marketData?.getMarket.market.userName === localStorage.getItem("id") && (
        <ChatResetDiv>
          <ChatResetBtn onClick={onClick}>대화 초기화</ChatResetBtn>
        </ChatResetDiv>
      )}
    </>
  );
}
export default ChatLogDelete;
