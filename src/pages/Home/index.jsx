import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import TabBar from "@/components/TabBar/TabBar";
import NavBar from "@/components/NavBar";
import MyLoading from "../../components/MyLoading";

import { useLocalStorageState } from "../../hooks/useLocalStorageState";

import styles from "./home.module.css";

import { getAgentListApi } from "../../api/list/common";

let _agentListCache = [];

function Home() {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useLocalStorageState("agentData", {});
  const [isEmptyPage, setIsEmptyPage] = useState(false);
  const [agentList, setAgentList] = useState(_agentListCache || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const { agents } = await getAgentListApi();
      if (agents.length > 0) {
        setAgentList(agents);
        setIsLoading(false);
        _agentListCache = agents;
      } else {
        setIsLoading(false);
        setIsEmptyPage(true);
      }
    }
    if (!_agentListCache.length && !isLoading && !isEmptyPage) {
      getData();
    }
  }, []);

  async function goProfile(item) {
    setAgentData(item);
    navigate(`/profile?id=${item.agentId}`);
  }

  return (
    <>
      {isLoading ? (
        <MyLoading />
      ) : (
        <div>
          <NavBar title="广场" isPerson={true} />

          <main className={styles.main}>
            {isEmptyPage && (
              <div className={styles.emptyText}>暂时数据，快去创建吧~</div>
            )}
            {agentList.map((item) => {
              return (
                <div
                  key={item.agentId}
                  className={styles.item}
                  onClick={() => goProfile(item)}
                >
                  <div className={styles.avatar}>
                    <img
                      src={
                        item.avatar ||
                        "https://img.cacheserv.com/web/webai/avatar-default.png"
                      }
                      className={styles.vanImage}
                      alt="avatar"
                    />
                  </div>

                  <div className={styles.userInfo}>
                    <div className={`${styles.name}`}>
                      {item.nickname}
                      <img
                        src={
                          item.gender
                            ? "https://img.cacheserv.com/web/webai/male-icon.png"
                            : "https://img.cacheserv.com/web/webai/famale-icon.png"
                        }
                        className={styles.gender}
                      />
                    </div>
                    <div className={styles.labels}>
                      {item.characters.map((label) => {
                        return (
                          <div
                            className={`${styles.label} fl-center`}
                            key={label}
                          >
                            {label}
                          </div>
                        );
                      })}
                    </div>
                    <div className={`${styles.content} escp-4`}>
                      {item.persona}
                    </div>
                  </div>
                </div>
              );
            })}
          </main>

          <TabBar />
        </div>
      )}
    </>
  );
}

export default Home;
