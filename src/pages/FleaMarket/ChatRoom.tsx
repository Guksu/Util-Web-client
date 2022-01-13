import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
}

function ChatRoom() {
  const [socket, setSocket] = useState<any>(io());
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [send, setSend] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
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
    setSend(!send);
    const message: Payload = {
      name,
      text,
    };
    socket.emit("msgToServer", message);
    setText("");
  };

  return (
    <>
      {socket ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
          />
          <div>
            <ul>
              {messages.map((message) => {
                if (message.name === name) {
                  return (
                    <li key={message.id}>
                      <div>{message.name}</div>
                      <p>{message.text}</p>
                    </li>
                  );
                }
                return (
                  <li key={message.id}>
                    <div>{message.name}</div>
                    <p>{message.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter message..."
          />
          <button type="button" onClick={() => sendMessage()}>
            Send
          </button>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default ChatRoom;
