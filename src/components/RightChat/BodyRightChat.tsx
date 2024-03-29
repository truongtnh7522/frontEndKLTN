import React, { useContext, useEffect, useState } from "react";
import Message from "./Message/Message";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
const BodyRightChat = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    console.log(data.chatId);
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <div className="chat-body p-4 flex-1 overflow-y-scroll">
      {messages.map((m, index) => (
        <Message message={m} key={index} />
      ))}
    </div>
  );
};

export default BodyRightChat;
