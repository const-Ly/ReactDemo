import React, { useRef, useState } from "react";
import "./index.less";

function InputText({ inputDisable, onSendMsg }) {
  const [inputValue, setInputValue] = useState("");
  const sendMsgRef = useRef(null);
  console.log("InputText更新了");
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSendMsg();
    }
  }

  function handleFocus() {
    // 1.8.0 聊天详情页调起键盘 页面上移	2022年4月26日 下午4:11, 安卓有延迟添加定时器
    const timer = setTimeout(() => {
      sendMsgRef.current && sendMsgRef.current.scrollIntoViewIfNeeded();
      clearTimeout(timer);
    }, 500);
  }

  function handleSendMsg() {
    onSendMsg({
      text: inputValue,
    });
    setInputValue("");
  }

  return (
    <div className="input-text-compnent fl-center">
      <input
        type="text"
        className="input"
        onFocus={handleFocus}
        placeholder="给TA发消息，看TA怎么回复"
        disabled={inputDisable}
        max-length={500}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {inputValue.length > 0 && (
        <img
          onClick={handleSendMsg}
          src="https://img.cacheserv.com/web/webai/send-msg.png"
          className="send-msg-icon"
        />
      )}
    </div>
  );
}

export default InputText;
