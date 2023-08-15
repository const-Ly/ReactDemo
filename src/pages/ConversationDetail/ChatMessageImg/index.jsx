import React from "react";
import "./index.less";

function ChatMessageImg({ imgs }) {
  return (
    <div className="chat-message-component-img">
      {imgs.map((item) => (
        <img className="img" src={item} alt="image" key={item} />
      ))}
    </div>
  );
}

export default ChatMessageImg;
