import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import styled from "styled-components";
import { isFleaNoAtom } from "../../atom";
import ChatLog from "../../components/FleaMarketComponents/ChatLog";
import ChatLogDelete from "../../components/FleaMarketComponents/ChatLogDelete";
import { SAVE_CHAT } from "../../gql/mutation";
import { Message, Payload, SaveChatIF } from "../../interfaces/FleaMarket";

export const ChatDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 50vw;
  margin: auto;
  outline: ${(props) => props.theme.divOutLineColor};
  overflow-y: auto;
`;

export const MyLi = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: flex-end;
  width: 45vw;
  margin: 3% 0;
  gap: 10px;
`;

export const OtherLi = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  width: 45vw;
  margin: 3% 0;
  gap: 10px;
`;

export const MessageDiv = styled.div`
  border: 1px solid #868e96;
  padding: 1%;
`;

const SendDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
  gap: 60px;
`;

const SendDiv2 = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

function ChatRoom() {
  const room = useRecoilValue(isFleaNoAtom).toString();
  const [socket, setSocket] = useState<any>(io());
  const [name] = useState<any>(localStorage.getItem("id"));
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [saveChat] = useMutation<SaveChatIF>(SAVE_CHAT);

  useEffect(() => {
    setSocket(io("https://util-web.herokuapp.com/"));
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", room);
    const receivedMessage = (message: Payload) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        name: message.name,
        text: message.text,
      };

      setMessages([...messages, newMessage]);
    };
    socket.on("msgToClient", (message: Payload) => receivedMessage(message));
  }, [messages, name, text]);

  const sendMessage = async () => {
    const message: Payload = {
      name,
      text,
      room,
    };
    socket.emit("msgToServer", message);
    try {
      await saveChat({
        variables: {
          saveChatInput: {
            room: parseInt(room),
            chatLog: text,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    setText("");
  };

  const enterKeyEvent: any = (e: any) => {
    if (e.key === "Enter") return sendMessage();
  };

  return (
    <>
      {socket ? (
        <>
          <ChatDiv>
            <ul>
              <ChatLog />
              {messages.map((message) => {
                if (message.name === name) {
                  return (
                    <MyLi key={message.id}>
                      <div>{message.name}</div>
                      <MessageDiv>{message.text}</MessageDiv>
                    </MyLi>
                  );
                }
                return (
                  <OtherLi key={message.id}>
                    <div>{message.name}</div>
                    <MessageDiv>{message.text}</MessageDiv>
                  </OtherLi>
                );
              })}
            </ul>
          </ChatDiv>
          <SendDiv>
            <SendDiv2>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="메세지를 입력하세요"
                onKeyPress={enterKeyEvent}
              />
              <button type="button" onClick={() => sendMessage()}>
                전송
              </button>
            </SendDiv2>
            <ChatLogDelete />
          </SendDiv>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default ChatRoom;
