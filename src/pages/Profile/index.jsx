import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getAgentApi, createAgentApi } from '../../api/list/common'

import NavBar from "@/components/NavBar";

import styles from "./index.module.css";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const edit = searchParams.get("edit");
  let agentId = searchParams.get("id");

  const [modelData, setModelData] = useLocalStorageState("agentData", {characters: []});

  if (!modelData.nickname) {
    getData();
  }

  async function getData() {
    if(!agentId) return
    const res = await getAgentApi({ agentId });
    if (!res || !res.agent) {
      navigate("/");
    } else {
      setModelData(res.agent);
    }
  }

  async function goChat() {
    // 如果是编辑状态则要生成模型
    if (edit) {
      const params = {
        nickname: modelData.nickname,
        avatar: modelData.avatar,
        characters: characters,
        persona: modelData.persona,
        gender: modelData.gender == "M",
        greeting: modelData.greeting,
        voice: "",
        agentId: "",
      };
      const { agent } = await createAgentApi({ agent: params });
      loading.hide();
      if (agent && agent.agentId) {
        agentId = agent.agentId
        setModelData(agent);
      } else {
        // showToast("网络异常，请稍后再试");
      }
    }
    navigate(`/conversationDetail/${agentId}`);
  }

  return (
    <>
      <NavBar isBack={true} />

      <main className={edit == 1 ? styles.p20 : ""}>
        <div className={styles.item}>
          <img
            src={
              modelData.avatar ||
              "https://img.cacheserv.com/web/webai/avatar-default.png"
            }
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <div className={`${styles.name} fl-center`}>
              {modelData.nickname}
              <img
                src={
                  modelData.gender
                    ? "https://img.cacheserv.com/web/webai/male-icon.png"
                    : "https://img.cacheserv.com/web/webai/famale-icon.png"
                }
                className={styles.gender}
              />
            </div>
            <div className={styles.labels}>
              {modelData.characters.map((item) => (
                <div className={`${styles.label} fl-center`} key={item}>
                  {item}
                </div>
              ))}
            </div>
            <div className={styles.content}>{modelData.persona}</div>
          </div>
        </div>
      </main>

      <div className={`${styles.btnContainer} fl-center`}>
        {edit == 1 && (
          <div
            className={`${styles.confrimBtn} fl-center ${styles.nextBtn}`}
            onClick={() => navigate(-1)}
          >
            上一步
          </div>
        )}
        <div
          className={`${styles.confrimBtn} fl-center ${
            edit == 1 ? "" : styles.w100
          }`}
          onClick={goChat}
        >
          与TA聊天
        </div>
      </div>
    </>
  );
}

export default Profile;
