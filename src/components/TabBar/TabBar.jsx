import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.less";

import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const barList = [
  {
    text: "广场",
    activeImg: "https://img.cacheserv.com/web/webai/home-bar-active.png",
    unActiveImg: "https://img.cacheserv.com/web/webai/home-bar-unactive.png",
    route: "/",
  },
  {
    activeImg: "https://img.cacheserv.com/web/webai/add-active.png",
    unActiveImg: "https://img.cacheserv.com/web/webai/add-un-active.png",
    route: "/create",
  },
  {
    text: "聊天",
    activeImg: "https://img.cacheserv.com/web/webai/chat-active.png",
    unActiveImg: "https://img.cacheserv.com/web/webai/chat-un-active.png",
    route: "/conversationList",
  },
];

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [_, setAgentData] = useLocalStorageState("agentData", {});

  console.log("TabBar组件更新了");
  return (
    <>
      <div className={`fl-center ${styles.container}`}>
        {barList.map((item) => {
          return (
            <div
              key={item.route}
              className={`fl-center ${styles.item}`}
              onClick={() => {
                if (item.route == "/create") setAgentData({});
                navigate(item.route);
              }}
            >
              <img
                src={
                  location.pathname == item.route
                    ? item.activeImg
                    : item.unActiveImg
                }
                alt="image"
              />
              {location.pathname == item.route ? (
                <div className={`${styles.text} fl-center`}>{item.text}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TabBar;
