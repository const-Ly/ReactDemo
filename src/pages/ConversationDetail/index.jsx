import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.less";

import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { generateInitMsg, uuid, getDeviceId, getDateNow } from "@/utils/utils";
import {
  createSessionApi,
  withdrawMsgApi,
  generateMsgApi,
} from "../../api/list/common";

import { ConvProvider } from "./context";

import NavBar from "@/components/NavBar";
import InputText from "../../components/InputText";
import ChatList from "./ChatList";
import WaitEnter from "../../components/WaitEnter";
import More from "./More/More";

const deviceId = getDeviceId();

function ChatDetail() {
  const { agentId } = useParams();

  console.log("ChtaDetail页面更新了");

  const chatDetailRef = useRef(null);
  const msgListContainerRef = useRef(null); //
  const elementRef = useRef(null); //
  const sendMsgRef = useRef(null);

  const [modelData, setModelData] = useLocalStorageState("agentData", {});
  const [convListPageData, setConvListPageData] = useLocalStorageState(
    "convListPageData",
    []
  );
  const [msgDetail, setMsgDetail] = useLocalStorageState("msgDetail", {});

  const [showMsgWaitStatus, setShowMsgWaitStatus] = useState(false);
  const [inputDisable, setInputDisable] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [msgList, setMsgList] = useState(msgDetail[agentId] || []);
  const [popVisible, setPopVisible] = useState(false);

  useEffect(() => {
    if (msgList.length == 0) {
      async function getMsgData() {
        const newList = await getInitMsg(false);
        setMsgList(newList);
        msgDetail[agentId] = newList;
        setMsgDetail(msgDetail);
        updateChatListData(newList[newList.length - 1]);
      }
      getMsgData();
    }
  }, []);

  // 获取参数
  function getQueryParams({ msgId = "", content = "", type = "user" } = {}) {
    return {
      msgId: msgId || uuid(),
      content: content,
      ts: getDateNow(),
      type: type,
    };
  }

  // 生成预留消息
  async function getInitMsg(isReset = false, isSwitch = false) {
    try {
      const params = {
        userId: deviceId,
        agentId: agentId,
        modelName: "minimax",
        predefined: isReset ? [] : generateInitMsg(),
        switch: isSwitch,
      };
      const data = await createSessionApi(params);
      if (!data.predefined) {
        data.predefined = [];
        data.predefined.unshift(
          getQueryParams({ content: modelData.greeting, type: "agent" })
        );
      }
      return data.predefined;
    } catch (error) {
      return [];
    }
  }

  // 点击更多
  function clickMore() {
    setPopVisible(true);
  }

  // 发送消息
  async function handleSendMsg({ text = "", qMsgId = "", aMsgId = "" } = {}) {
    try {
      if (!text) return;
      setInputDisable(true);
      const queryContent = getQueryParams({ msgId: qMsgId, content: text });

      if (!qMsgId) setMsgList([...msgList, queryContent]);

      setShowMsgWaitStatus(true);

      const params = {
        userId: deviceId,
        agentId: agentId,
        query: queryContent,
        answer: getQueryParams({ msgId: aMsgId, type: "agent" }),
        modelName: "minimax",
      };
      let data = await generateMsgApi(params);

      console.warn("收到的消息", data, msgList.length);

      if (!data || !data.answer) data = { answer: getExceptMsg() };

      setShowMsgWaitStatus(false);
      const answerContent = data.answer.content;
      data.answer.content = "";
      setMsgList((prevMsgList) => [...prevMsgList, data.answer]);
      // 逐字显示
      setTypewriterText(answerContent);
    } catch (error) {
      setInputDisable(false);
      setShowMsgWaitStatus(false);
    }
  }

  // 刷新答案
  const handleRefreshMsg = useCallback(() => {
    // 文字正在显示的时候，点击刷新无效
    if (typewriterText) return;
    setShowMsgWaitStatus(true);
    const lastMsg = msgList.pop();
    const queryMsg = msgList[msgList.length - 1];
    setMsgList([...msgList]);
    handleSendMsg({
      text: queryMsg.content,
      qMsgId: queryMsg.msgId,
      aMsgId: lastMsg.msgId,
    });
  }, [typewriterText, msgList]);

  // 逐字输入结束
  const handleTypeWriterEnd = useCallback(() => {
    const newMsgList = [...msgList];
    newMsgList[newMsgList.length - 1].content = typewriterText;
    setMsgList(newMsgList);
    msgDetail[agentId] = newMsgList;
    setMsgDetail(msgDetail);
    setTypewriterText("");
    setInputDisable(false);
    updateChatListData(newMsgList[newMsgList.length - 1]);
  }, [typewriterText, msgList]);
  // function handleTypeWriterEnd() {

  // }

  // 处理回溯消息
  async function handleBacktrackConv(index) {
    console.log("i", index, msgList.length);
    if (index == -1) return;
    try {
      if (index + 1 == msgList.length) {
        setPopVisible(false);
        return;
      }
      const selectMsg = msgList[index + 1];
      const { msgId, ts } = selectMsg;
      const data = await withdrawMsgApi({
        userId: deviceId,
        agentId: agentId,
        mark: {
          msgId: msgId,
          ts: Number(ts),
        },
      });
      setPopVisible(false);
      if (data.agentId) {
        msgList.splice(index + 1);
        setMsgList(msgList);
        msgDetail[agentId] = msgList;
        setMsgDetail(msgDetail);
        updateChatListData(msgList[msgList.length - 1]);
      } else {
        // showToast('网络异常，请稍后再试')
      }
    } catch (error) {
      setPopVisible(false);
      // showToast('网络异常，请稍后再试')
    }
  }

  // 更新聊天列表数据
  function updateChatListData(data) {
    let index = convListPageData.findIndex((item) => item.agentId == agentId);
    if (index == -1) {
      convListPageData.unshift(modelData);
      setConvListPageData([...convListPageData]);
      index = 0;
    }
    convListPageData[index].content = data.content;
    convListPageData[index].ts = data.ts;
    setConvListPageData([...convListPageData]);
  }

  return (
    <ConvProvider>
      <div className="chat-detail-page">
        <div className="top-bar">
          <NavBar isBack={true} />
        </div>

        <main ref={chatDetailRef} className="chat-detail-content">
          <div className="statement-msg fl-center">
            <span>智能体消息由AI</span>
            <span>生成，不代表官方立场</span>
          </div>
          <div ref={msgListContainerRef}>
            <div style={{ height: "2px" }} ref={elementRef}></div>
            <ChatList
              msgList={msgList}
              typewriterText={typewriterText}
              onTypeEnd={handleTypeWriterEnd}
              onRefreshMsg={handleRefreshMsg}
            />
          </div>

          {/* <!-- 等待对方回复的状态显示 --> */}
          {showMsgWaitStatus && <WaitEnter />}
        </main>

        {/* <!-- input输入框 --> */}
        <div className="chat-detail-bottom" ref={sendMsgRef}>
          <div className="send-msg fl-center">
            <InputText inputDisable={inputDisable} onSendMsg={handleSendMsg} />
            <img
              onClick={clickMore}
              src="https://img.cacheserv.com/web/webai/more-icon-40.png"
              className="more-icon"
            />
          </div>
        </div>

        <More
          visible={popVisible}
          onBacktrackConv={handleBacktrackConv}
          onCloseMorePop={() => {
            setPopVisible(false);
          }}
        />
      </div>
    </ConvProvider>
  );
}

export default ChatDetail;
