import React, { useEffect, useRef, useState, memo } from "react";
import "./index.less";

import * as audioData from "../../../assets/json/audio.json";

import TypewriterMessage from "../../../components/TypewriterMessage";
import ChatMessage from "../ChatMssage";
import ChatMessageImg from "../ChatMessageImg";
import LottieAniamtion from "../../../components/LottieAniamtion";

import { useConvState, useConvDispatch } from "../context";

const ChatList = memo(
  ({ msgList, typewriterText, onRefreshMsg, onTypeEnd }) => {
    const msgLastItemRef = useRef(null);

    const state = useConvState();
    const dispatch = useConvDispatch();

    const [currentClickAudioIndex, setCurrentClickAudioIndex] = useState(-1);

    console.log("ChatList组件更新了");

    useEffect(() => {
      onScroll();
    }, [msgList]);

    function onScroll() {
      msgLastItemRef.current?.scrollIntoView();
    }

    return (
      <div
        className={`chat-list-component ${
          state.backtrackMsgStatus ? "p-l-40" : ""
        }`}
      >
        {msgList.map((item, index) => {
          return (
            <div key={item.msgId} className="msg-item">
              {/* <!-- 自己 --> */}
              {item.type == "user" ? (
                <div className="me-item">
                  <ChatMessage
                    message={item.content}
                    styles={{
                      backgroundColor: "#89bdae",
                      borderRadius: "14px",
                      color: "#fff",
                    }}
                  />
                </div>
              ) : (
                <div className="you-item">
                  <div className="message">
                    {item.imgUrlList && item.imgUrlList.length > 0 && (
                      <ChatMessageImg imgs={imgUrlList} />
                    )}

                    {!item.content && typewriterText ? (
                      <TypewriterMessage
                        message={typewriterText}
                        onTypeEnd={onTypeEnd}
                        onUpdate={onScroll}
                      />
                    ) : (
                      <ChatMessage message={item.content} />
                    )}

                    <div className="msg-line"></div>
                    <div className="audio fl-center">
                      <img
                        onClick={() => {
                          // playAudio(item, index);
                          setCurrentClickAudioIndex(index);
                        }}
                        src="https://img.cacheserv.com/web/webai/play-icon.png"
                        className="icon"
                      />
                      {index !== currentClickAudioIndex ? (
                        <div className="audio-play-con fl-center">
                          <img src="https://img.cacheserv.com/web/webai/play-audio-icon.png" />
                        </div>
                      ) : (
                        <LottieAniamtion src={audioData}></LottieAniamtion>
                      )}
                    </div>
                    {/* <!-- 刷新消息 --> */}
                    {index == msgList.length - 1 && (
                      <img
                        onClick={onRefreshMsg}
                        src="https://img.cacheserv.com/web/webai/refresh-icon.png"
                        className="refresh-icon"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* <!-- 选择回溯 --> */}
              {state.backtrackMsgStatus && item.type == "agent" && (
                <div className="select-back-msg">
                  <img
                    onClick={() => {
                      dispatch({
                        type: "update_index",
                        index: index,
                      });
                    }}
                    src={
                      state.backtrackMsgIndex == index
                        ? "https://img.cacheserv.com/web/webai/confirm-icon.png"
                        : "https://img.cacheserv.com/web/webai/aircle-icon.png"
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
        <div ref={msgLastItemRef} style={{ height: "1px" }}></div>
      </div>
    );
  }
);

export default ChatList;
