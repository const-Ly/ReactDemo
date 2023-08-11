import React, { useState, useEffect } from "react";
import './index.less'

function TypewriterMessage({ message = '额......', onUpdate, onTypeEnd }) {
  console.log('TypewriterMessage组件更新了')
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => prevMessage + message[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      onUpdate()
    }, 50);

    if (currentIndex === message.length) {
      clearInterval(interval);
      onTypeEnd()
    }

    return () => clearInterval(interval);
  }, [currentIndex, message]);

  return <div className="typewriter-msg-compontent">{currentMessage}</div>;
}

export default TypewriterMessage;
