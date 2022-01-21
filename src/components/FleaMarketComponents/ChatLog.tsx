import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_CHAT } from "../../gql/query";
import { IDarams } from "../../interfaces/CommonIF";
import { GetChatIF } from "../../interfaces/FleaMarket";
import { MessageDiv, MyLi, OtherLi } from "../../pages/FleaMarket/ChatRoom";

function ChatLog() {
  const params = useParams<IDarams>();
  const room = Number(params.id);
  const id = localStorage.getItem("id");
  const { data: chatData, refetch } = useQuery<GetChatIF>(GET_CHAT, {
    variables: {
      getChatLogInput: {
        room,
      },
    },
  });

  const chatList = chatData?.getChat.chatLog.map((item) => {
    if (item.name === id) {
      return (
        <MyLi key={item.chatLogNo}>
          <div>{item.name}</div>
          <MessageDiv>{item.chatLog}</MessageDiv>
        </MyLi>
      );
    }
    return (
      <OtherLi key={item.chatLogNo}>
        <div>{item.name}</div>
        <MessageDiv>{item.chatLog}</MessageDiv>
      </OtherLi>
    );
  });

  useEffect(() => {
    refetch();
  }, []);

  return <>{chatList}</>;
}

export default ChatLog;
