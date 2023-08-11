import React, { useState, useEffect } from 'react';

function TypewriterMessage({ message }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => prevMessage + message[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 100);

    if (currentIndex === message.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentIndex, message]);

  return <div>{currentMessage}</div>;
}

export default TypewriterMessage;
