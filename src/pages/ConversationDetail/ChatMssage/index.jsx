import React from "react";
import './index.less'

function ChatMessage({ message = '额......', styles ={} }) {
  return <div className="chat-message-compontent" style={styles}>{message}</div>;
}

export default ChatMessage;
