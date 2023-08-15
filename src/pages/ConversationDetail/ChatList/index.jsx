import React, { useEffect, useRef, useState, memo } from "react";
import "./index.less";

import { PlayCircleTwoTone, PauseCircleTwoTone } from "@ant-design/icons";
import { Toast } from "react-vant";
import * as audioData from "../../../assets/json/audio.json";
import speak from "../../../utils/speak";
import { removeParenthesesContent, isIos } from "@/utils/utils";

import TypewriterMessage from "../../../components/TypewriterMessage";
import ChatMessage from "../ChatMssage";
import ChatMessageImg from "../ChatMessageImg";
import LottieAniamtion from "../../../components/LottieAniamtion";

import { useConvState, useConvDispatch } from "../context";

const ChatList = memo(
  ({ msgList, typewriterText, voice, onRefreshMsg, onTypeEnd }) => {
    const audioPlayTimerRef = useRef(null);
    const msgLastItemRef = useRef(null);

    const state = useConvState();
    const dispatch = useConvDispatch();

    const [currentClickAudioIndex, setCurrentClickAudioIndex] = useState(-1);
    const [isPlayAudio, setIsPlayAudio] = useState(false);
    const [isEndAudio, setIsEndAudio] = useState(false);

    console.log("ChatList组件更新了", isIos);

    useEffect(() => {
      onScroll();
      return () => {
        speak.playerDestory();
      };
    }, [msgList]);

    function onScroll() {
      msgLastItemRef.current?.scrollIntoView();
    }

    function handlePlayAudio(item, index) {
      if (isIos && isPlayAudio) {
        Toast.info("语音正在播放中...");
        return;
      }
      speak({
        content: removeParenthesesContent(item.content || typewriterText),
        endCallback: handleAudioEnd,
        startCallback: handleAudioStart,
        voice: voice,
      });
      setCurrentClickAudioIndex(index);
    }

    function handleAudioStart() {
      setIsPlayAudio(true);
    }

    function handleAudioEnd(res) {
      try {
        console.log('sss', isIos)
        if (isIos) {
          setIsPlayAudio(true);
          const audioDuration = (res.audioDuration / 10000000).toFixed(2) - 0.3;
          audioPlayTimerRef.current = setTimeout(() => {
            clearAudioPlayTimer();
            setIsPlayAudio(false);
            setCurrentClickAudioIndex(-1);
          }, audioDuration * 1000);
          return;
        }
        clearAudioPlayTimer();
        setIsEndAudio(!isEndAudio);
        setCurrentClickAudioIndex(-1);
        setIsPlayAudio(false);
      } catch (error) {
        console.log(error);
      }
    }

    function clearAudioPlayTimer() {
      if (audioPlayTimerRef.current) {
        clearTimeout(audioPlayTimerRef.current);
        audioPlayTimerRef.current = null;
      }
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
                      <ChatMessageImg imgs={item.imgUrlList} />
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
                      {isPlayAudio &&
                      index == currentClickAudioIndex &&
                      !isIos ? (
                        // 播放
                        <PauseCircleTwoTone
                          onClick={() => {
                            setIsPlayAudio(false);
                            speak.pause();
                          }}
                          style={{ fontSize: "24px" }}
                          twoToneColor="#89bdae"
                        />
                      ) : (
                        // 暂停
                        <PlayCircleTwoTone
                          style={{ fontSize: "24px" }}
                          twoToneColor="#89bdae"
                          onClick={() => handlePlayAudio(item, index)}
                        />
                      )}

                      {/* 语音播放动画 */}
                      <LottieAniamtion
                        src={audioData}
                        isEnd={isEndAudio}
                        isPlay={isPlayAudio && index == currentClickAudioIndex}
                      ></LottieAniamtion>
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

ChatList.displayName = "displayName";

export default ChatList;
