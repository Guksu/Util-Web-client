import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import styled from "styled-components";
import { isFleaNoAtom } from "../../atom";

interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
  room: string;
}

const ChatDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 50vw;
  margin: auto;
  outline: ${(props) => props.theme.divOutLineColor};
`;

const MyLi = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: flex-end;
  width: 45vw;
  margin: 3% 0;
  gap: 10px;
`;

const OtherLi = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  width: 45vw;
  margin: 3% 0;
  gap: 10px;
`;

const MessageDiv = styled.div`
  border: 1px solid #868e96;
  padding: 1%;
`;

const SendDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
  gap: 30px;
`;

function ChatRoom() {
  const room = useRecoilValue(isFleaNoAtom).toString();
  const [socket, setSocket] = useState<any>(io());
  const [name] = useState<any>(localStorage.getItem("id"));
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
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

  const sendMessage = () => {
    const message: Payload = {
      name,
      text,
      room,
    };
    socket.emit("msgToServer", message);
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
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메세지를 입력하세요"
              onKeyPress={enterKeyEvent}
            />
            <button type="button" onClick={() => sendMessage()}>
              전송
            </button>
          </SendDiv>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default ChatRoom;
