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
  const [socket, setSocket] = useState<any>(io("http://localhost:4000"));
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.connect();
    const receivedMessage = (message: Payload) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        name: message.name,
        text: message.text,
      };

      setMessages([...messages, newMessage]);
    };

    socket.on("msgToClient", (message: Payload) => {
      receivedMessage(message);
    });
  }, [messages, text]);

  const sendMessage = () => {
    const message: Payload = {
      name,
      text,
    };

    socket.emit("msgToServer", message);
    setText("");
  };
  return (
    <>
      {" "}
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
                  <span>{message.name}</span>

                  <p>{message.text}</p>
                </li>
              );
            }

            return (
              <li key={message.id}>
                <span>{message.name}</span>

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
  );
}

export default ChatRoom;
