import React from "react";

function ChatMessageImg(imgs) {
  return (
    <div className="chat-message-compontnt-img">
      {imgs.map((item) => (
        <img className="img" src={item} alt="image" key={item} />
      ))}
    </div>
  );
}

export default ChatMessageImg;
