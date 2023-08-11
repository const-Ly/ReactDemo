import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

import styles from "./index.module.css";
import "./index.less";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const MALE_RANDOM_TEXT_LIST = [
  "一名年轻的创业者，他性格坚毅果断，喜欢热爱工作，偶尔喜欢独自漫步。爱好读书和旅行。喜欢吃披萨和寿司，讨厌辣椒。梦想是建立自己的企业，成为行业领军人物。印象最深的事是在大学毕业典礼上，他收获了学业的硕果，感受到亲友的鼓励和祝福。",
  "一名年轻的广告公司设计师，他性格活泼开朗，喜欢在工作中发挥创意，偶尔喜欢参加派对。爱好摄影和绘画。喜欢吃披萨和冰淇淋，讨厌苦瓜。梦想是成为国际知名的设计师，设计出影响人们生活的优秀作品。印象最深的事是在一次设计比赛中，他意外获得冠军，为自己赢得的荣誉而自豪。",
  "一名年轻的医生，他性格温和善良，喜欢照顾患者，偶尔喜欢在医院花园散步。爱好音乐和绘画。喜欢吃寿司和水果沙拉，讨厌辣椒。梦想是成为一名卓越的医学专家，为更多的人带来健康和希望。印象最深的事是在一次紧急手术中，他成功挽救了一个患者的生命，让他意识到医生的责任和使命。",
  "一名年轻的作家，他性格内向文静，喜欢独自创作，偶尔喜欢参加文学沙龙。爱好读书和写作。喜欢吃巧克力和披萨，讨厌洋葱。梦想是成为畅销书作家，让更多人读到他的文字。印象最深的事是在一次旅行中，他遇到一位独特的老人，老人的故事和智慧深深地触动了他。",
  "一名程序员,他性格认真务实,喜欢写代码,偶尔出去跑步。爱好看科技资讯和听音乐。喜欢吃披萨和汉堡,讨厌苦瓜。梦想是创办一家科技公司。印象最深的事是第一次参加编程比赛获得冠军。",
];

const FEMALE_RANDOM_TEXT_LIST = [
  "一名服装设计师,她性格活泼开朗,喜欢逛街购物,偶尔参加健身房运动。爱好绘画和打太极拳,喜欢吃土豆丝和火锅,讨厌苹果。梦想是开创自己的服装品牌。印象最深的事是高中参加校园歌唱大赛获得第二名的时刻。",
  "一名时尚设计师,她性格活泼大方,喜欢逛街购物,偶尔参加化妆舞会。爱好时尚杂志和美食料理,喜欢吃法餐和甜品,讨厌青菜。梦想是成为知名品牌的首席设计师。印象最深的事是高中时第一次自己设计服装参加校园时装秀。",
  '一名时尚编辑,她性格傲气十足,喜欢购物消费,偶尔参加 PINN 模特大赛。爱好看时尚杂志和逛博览会,喜欢吃牛排和蛋糕,讨厌青菜。梦想是成为时尚界的女王。印象最深的事是高中时被同学评为"最有时尚品味"。',
  "一名画家,她性格热情大方,喜欢绘画写生,偶尔进行形式主义艺术创作。爱好听古典音乐和阅读文学名著,喜欢吃披萨和寿司,讨厌茄子。梦想是举办个人画展。印象最深的事是初中美术课上老师表扬她的绘画作品。",
  "一名打工妹,她性格活泼开朗,喜欢逛街购物,偶尔参加舞蹈课。爱好唱歌和做美食,喜欢吃寿司和水果,讨厌芒果。梦想是成为一名歌手。印象最深的事是获得过歌唱比赛的冠军。",
];
let randomTextIndex = -1;

function AddModel() {
  const navigate = useNavigate();

  const [agentData, setAgentData] = useLocalStorageState("agentData", {});
  const [avatar, setAvatar] = useState(agentData.avatar || "");
  const [nickname, setNickname] = useState(agentData.nickname || "");
  const [characters, setCharacters] = useState(agentData.characters.join(""));
  const [gender, setGender] = useState("");
  const [persona, setPersona] = useState(agentData.persona || "");
  const [greeting, setGreeting] = useState(agentData.greeting || "");
  const [isActiveNextBtn, setIsActiveNextBtn] = useState(false);

  useEffect(() => {
    // 如果有性别的数据
    if (agentData.gender !== "") {
      setGender(agentData.gender ? "M" : "F");
    }
  }, []);

  useEffect(() => {
    if (avatar && nickname && characters && gender && persona && greeting) {
      setIsActiveNextBtn(true);
    } else {
      setIsActiveNextBtn(false);
    }
  }, [avatar, nickname, characters, gender, persona, greeting]);

  function changeFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setAvatar(content);
    };
    reader.readAsDataURL(file);
  }

  function clickRandomText() {
    randomTextIndex += 1;
    if (randomTextIndex == 5) randomTextIndex = 0;
    if (gender == "M") {
      setPersona(MALE_RANDOM_TEXT_LIST[randomTextIndex]);
    } else {
      setPersona(FEMALE_RANDOM_TEXT_LIST[randomTextIndex]);
    }
  }
  function goProfile(e) {
    e.preventDefault();
    if (!isActiveNextBtn) return;
    setAgentData({
      nickname: nickname,
      avatar: avatar,
      characters: characters.split(" "),
      persona: persona,
      gender: gender == "M",
      greeting: greeting,
      voice: "",
      createTime: "",
    });

    navigate(`/profile?edit=1`);
  }

  return (
    <div className="add-model-page">
      <NavBar isBack={true} content="创建AI角色基本信息" />
      <main className={`${styles.main} fl-center`}>
        {/* 上传图片 */}
        <div className={styles.uploadFileContainer}>
          <img
            src={
              avatar ||
              "https://img.cacheserv.com/web/webai/upload-img-icon.png"
            }
            className={`${styles.uploadImg} ${avatar ? styles.avatar : ""}`}
          />
          <input
            className={styles.uploadFile}
            type="file"
            onChange={changeFile}
          />
        </div>

        <form style={{ width: "100%" }} onSubmit={goProfile}>
          {/* 名字 */}
          <div className={styles.inputContainer}>
            <div className={styles.title}>TA的昵称</div>
            <input
              value={nickname}
              style={{ border: "none" }}
              placeholder="你的AI角色叫什么"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* 关键词 */}
          <div className={styles.inputContainer}>
            <div className={styles.title}>TA的关键词</div>
            <input
              value={characters}
              style={{ border: "none" }}
              placeholder="描述TA的关键词，用空格分隔"
              onChange={(e) => setCharacters(e.target.value)}
            />
          </div>

          {/* 性别 */}
          <div className="input-container">
            <div className="title">TA的性别</div>
            <div className="fl-center geder-select">
              <div onClick={() => setGender("M")} className="fl-center male">
                <img
                  src={
                    gender == "M"
                      ? "https://img.cacheserv.com/web/webai/confirm-icon.png"
                      : "https://img.cacheserv.com/web/webai/aircle-icon.png"
                  }
                  className="icon"
                />
                <div className="text">男</div>
                <img
                  src="https://img.cacheserv.com/web/webai/male-icon.png"
                  className="icon"
                />
              </div>
              <div onClick={() => setGender("F")} className="fl-center female">
                <img
                  src={
                    gender == "F"
                      ? "https://img.cacheserv.com/web/webai/confirm-icon.png"
                      : "https://img.cacheserv.com/web/webai/aircle-icon.png"
                  }
                  className="icon"
                />
                <div className="text">女</div>
                <img
                  src="https://img.cacheserv.com/web/webai/famale-icon.png"
                  className="icon"
                />
              </div>
            </div>
          </div>

          {/* 人设 */}
          <div className="input-container">
            <div className="title fl-center">
              <span>TA的人设</span>
              <div onClick={clickRandomText} className="random-text fl-center">
                <img src="https://img.cacheserv.com/web/webai/refresh-icon-18.png" />
                <span>随机生成</span>
              </div>
            </div>
            <textarea
              value={persona}
              style={{ height: "140px" }}
              placeholder="AI角色的人物设定，包括性格、爱好、经历等"
              onChange={(e) => setPersona(e.target.value)}
            />
          </div>

          {/* 开场白 */}
          <div className="input-container">
            <div className="title fl-center">
              <span>TA的开场白</span>
            </div>
            <textarea
              value={greeting}
              style={{ maxHeight: "68px" }}
              placeholder="TA说的第一句话"
              onChange={(e) => setGreeting(e.target.value)}
            />
          </div>

          <button
            className={`confrim-btn fl-center ${
              isActiveNextBtn ? "confrim-btn-active" : ""
            }`}
            type="submit"
          >
            下一步
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddModel;
