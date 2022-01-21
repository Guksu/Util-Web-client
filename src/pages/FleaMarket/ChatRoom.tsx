import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatLog from "../../components/FleaMarketComponents/ChatLog";
import ChatLogDelete from "../../components/FleaMarketComponents/ChatLogDelete";
import { SAVE_CHAT } from "../../gql/mutation";
import { IDarams } from "../../interfaces/CommonIF";
import { Message, Payload, SaveChatIF } from "../../interfaces/FleaMarket";

export const ChatDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 20vw;
  margin: auto;
  outline: ${(props) => props.theme.divOutLineColor};
  background-color: ${(props) => props.theme.divBackgroundColor};
  border-radius: 20px;

  @media (max-width: 1024px) {
    width: 30vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
  }
  @media (max-width: 425px) {
    width: 70%;
  }
`;

const ChatUl = styled.ul`
  width: 95%;
`;

export const MyLi = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-end;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 3% 0;
  gap: 10px;
`;

export const OtherLi = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  margin: 3% 0;
  gap: 10px;
`;

export const MessageDiv = styled.div`
  height: 30px;
  border: 1px solid #868e96;
  background-color: ${(props) => props.theme.bgColor};
  padding: 3% 1% 1% 1%;
  border-radius: 10px;
`;

const SendDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 40px;
`;

const SendInput = styled.input`
  @media (max-width: 1024px) {
    width: 150px;
  }
`;

function ChatRoom() {
  const params = useParams<IDarams>();
  const room = params.id;
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
            <ChatUl>
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
            </ChatUl>
          </ChatDiv>
          <SendDiv>
            <SendInput
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메세지를 입력하세요"
              onKeyPress={enterKeyEvent}
            />
            <button type="button" onClick={() => sendMessage()}>
              전송
            </button>
          </SendDiv>
          <ChatLogDelete />
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default ChatRoom;
