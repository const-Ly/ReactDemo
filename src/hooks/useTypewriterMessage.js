import { useState, useEffect } from "react";

function TypewriterMessage({ message = [], domRef } = {}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => prevMessage + message[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      domRef.innerHTML = currentMessage;
    }, 100);

    if (currentIndex === message.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentIndex, message]);
}

export default TypewriterMessage;
