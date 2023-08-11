import './index.less'
import React, { useEffect, useState } from "react";
import TabBar from "@/components/TabBar/TabBar";
import NavBar from "@/components/NavBar";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/utils";


function ConversationList() {
  const navigate = useNavigate();

  const [convListPageData] = useLocalStorageState("convListPageData", []);
  const [convList, setConvList] = useState([]);
  useEffect(() => {
    convListPageData.sort((a, b) => b.ts - a.ts);
    setConvList(convListPageData);
  }, []);

  return (
    <>
      <NavBar title="聊天列表" />
      <div className="conv-list-page">
        {convList.length > 0 ? (
          <div>
            {convList.map((item) => (
              <div key={item.agentId} className="item fl-center">
                <div
                  onClick={() => {
                    navigate(`/profile?id=${item.agentId}`);
                  }}
                  className="avatar"
                >
                  <img
                    src={
                      item.avatar ||
                      "https://img.cacheserv.com/web/webai/avatar-default.png"
                    }
                    alt="avatar"
                  />
                </div>
                <div
                  onClick={() => {
                    navigate(`/conversationDetail/${item.agentId}`);
                  }}
                  className="user-info"
                >
                  <div className="name fl-center">
                    <div className="fl-center">
                      <span className="text">{item.nickname} </span>
                      <img
                        src={
                          item.gender
                            ? "https://img.cacheserv.com/web/webai/male-icon.png"
                            : "https://img.cacheserv.com/web/webai/famale-icon.png"
                        }
                        className="gender"
                      />
                    </div>
                    <div className="time"> {formatDate(item.ts)} </div>
                  </div>
                  <div className="content escp-1">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-text">暂无聊天，快去体验吧~</div>
        )}
      </div>
      <TabBar />
    </>
  );
}

export default ConversationList;
