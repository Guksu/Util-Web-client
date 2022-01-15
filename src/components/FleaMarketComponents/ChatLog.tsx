import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isFleaNoAtom } from "../../atom";
import { GET_CHAT } from "../../gql/query";
import { GetChatIF } from "../../interfaces/FleaMarket";
import { MessageDiv, MyLi, OtherLi } from "../../pages/FleaMarket/ChatRoom";

function ChatLog() {
  const room = useRecoilValue(isFleaNoAtom);
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
