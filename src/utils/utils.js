import { getLocalStorage, setLocalStorage } from "./storage";

const DEFAULT_AGE = 20;

// 加载脚本文件
export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    const head = document.getElementsByTagName("head")[0];
    script.type = "text/javascript";
    script.src = src;
    const id = getRandom(1, 1000000);
    if (document.getElementById(id)) return;
    script.id = id;
    if (script.addEventListener) {
      script.addEventListener(
        "load",
        () => {
          resolve(src);
        },
        false
      );
    } else if (script.attachEvent) {
      script.attachEvent("onreadystatechange", function () {
        const target = window.event.srcElement;
        if (target.readyState == "loaded") {
          resolve();
        }
      });
    }
    head.appendChild(script);
  });
};

export function getRandom(min, max) {
  // 获取随机整数
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function logoutDeleteData() {
  // 退出登录，保存翻译文案和支付方式
  const translateMap = getLocalStorage("translateMap");
  const deviceId = getLocalStorage("deviceId");
  const selectGender = getLocalStorage("selectGender");
  localStorage.clear();
  if (translateMap) setLocalStorage("translateMap", translateMap);
  if (deviceId) setLocalStorage("deviceId", deviceId);
  if (selectGender) setLocalStorage("selectGender", selectGender);
}

export const isTestEnv = import.meta.env.VITE_APP_MODE === "development";

// 不足两位数补领
export const supplementZero = (value) => {
  return Number(value) > 9 ? value : `0${value}`;
};

// 获取设备id
export const getDeviceId = () => {
  try {
    let deviceId =
      window.__chat_join_device_id__ || getLocalStorage("deviceId") || "";
    if (!deviceId || deviceId.toString().length <= 13) {
      deviceId =
        new Date().getTime().toString() + getRandom(10000000, 99999999);
      window.__chat_join_device_id__ = deviceId;
      setLocalStorage("deviceId", deviceId);
    }
    return deviceId;
  } catch (error) {
    return (deviceId =
      new Date().getTime().toString() + getRandom(10000000, 99999999));
  }
};

// 生成一个1到7之间的随机奇数
export const getRandomOddNumber = (num = 5) => {
  let number;
  do {
    number = Math.floor(Math.random() * num) + 1; // 生成1到7之间的随机整数
  } while (number % 2 !== 0); // 继续生成随机数直到得到奇数

  return number;
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16).toLocaleUpperCase();
  });
};

export const generateInitMsg = ({ modelId, uid } = {}) => {
  const msgList = [];
  const random = getRandomOddNumber();

  /**
   * type类型
    predefined_user = 0;
    predefined_agent = 1;
    user = 2;
    agent = 3;

      userId: uid,
      agentId: modelId,
   */

  for (let i = 0; i < random; i++) {
    msgList.push({
      msgId: uuid(),
    });
  }
  return msgList;
};

export const isMobile = () => {
  let flag =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|PlayBook|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return flag;
};


// 平台类型 1安卓 2ios
export const getPlatform = (() => {
  let platform = -1;
  return () => {
    try {
      if (platform > -1) return platform;
      const azu = navigator.userAgent;
      platform = 0;
      if (isMobile()) {
        if (azu.indexOf("Android") > -1 || azu.indexOf("Adr") > -1)
          platform = 1;
        if (azu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) platform = 2;
      }
      return platform;
    } catch (error) {
      return 0;
    }
  };
})();

export const isPc = getPlatform() === 0;
export const isAndroid = getPlatform() === 1;
export const isIos = getPlatform() === 2;

// 判断操作系统
export const getPosType = (() => {
  let os = 0;
  return () => {
    try {
      if (os) return os;
      const agent = navigator.userAgent.toLowerCase();
      const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      if (agent.indexOf("win") >= 0 || agent.indexOf("wow") >= 0) os = 1;
      if (isMac) os = 2;
      return os;
    } catch (error) {
      return 1;
    }
  };
})();

export const getOs = () => {
  try {
    const deviceTypeObj = {
      1: "Android",
      2: "iOS",
      0: "PC",
    };
    const osObj = {
      1: "Windows",
      2: "MacOS",
      3: "unknown",
    };

    const pos = osObj[getPosType()];
    const deviceType = deviceTypeObj[getPlatform()];
    const os = deviceType == "PC" ? pos : deviceType;
    return os;
  } catch (error) {
    return "unknown";
  }
};

export const formatDate = (timestamp = "", isYMD = false, isS = false) => {
  if (!timestamp || timestamp == -1) return "";
  const date = new Date(Number(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (isYMD) {
    return Y + M + D;
  }
  if (isS) {
    return Y + M + D + h + m + ":" + s;
  }
  const currentYear = new Date().getFullYear();
  if (Y != currentYear + "-") {
    return Y + M + D + h + m;
  }
  return M + D + h + m;
};

// 获取注册的默认生日
export const getDefaultBirthDay = (() => {
  let defaultBirthDay = null;
  return () => {
    if (defaultBirthDay) {
      return defaultBirthDay;
    }
    const DateTime = new Date();
    const month = supplementZero(DateTime.getMonth() + 1);
    const day = supplementZero(DateTime.getDate());
    const hours = supplementZero(DateTime.getHours());
    const Minutes = supplementZero(DateTime.getMinutes());
    const seconds = supplementZero(DateTime.getSeconds());
    return (defaultBirthDay = `${
      DateTime.getFullYear() - DEFAULT_AGE
    }-${month}-${day} ${hours}:${Minutes}:${seconds}`);
  };
})();

// 获取时区，出现小数后四舍五入
export const getTimeZone = (() => {
  let timezone = null;
  return () => {
    if (timezone) {
      return timezone;
    }
    timezone = Math.round((new Date().getTimezoneOffset() / 60) * -1);
    return timezone;
  };
})();

// 根据语言类型格式化多语言，
export const getFormatLang = () => {
  try {
    const LANG_LIST = ["ar", "es", "en", "hi"];
    let lang = navigator.language.split("_")[0].split("-")[0];
    if (getLanguage() == "en-IN") lang = "hi";
    if (LANG_LIST.indexOf(lang) > -1) return lang;
    return "en";
  } catch (error) {
    console.warn("ddd", error);
    return "en";
  }
};

// 获取浏览器语言
export const getLanguage = () => {
  let language = navigator.language;
  if (language == "sa-IN") language = "en-IN";
  return language;
};

export const throttle = (func, delay) => {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
};

export const debounce = (func, wait) => {
  //定时器变量
  let timeout;
  return function () {
    clearTimeout(timeout);
    //指定多少秒后触发事件操作handler
    timeout = setTimeout(func, wait);
  };
};

// 获取当前日期
export const getCurrentDate = (str = "") => {
  const DateTime = new Date();
  const month = supplementZero(DateTime.getMonth() + 1);
  const day = supplementZero(DateTime.getDate());
  return `${DateTime.getFullYear()}${str}${month}${str}${day}`;
};

/**
 * @param startDate  开始日期 yyyy-MM-dd
 * @param endDate  结束日期 yyyy-MM-dd
 * @returns {number} 两日期相差的天数
 */
export const getDaysBetween = (startDate, endDate) => {
  const sDate = Date.parse(startDate);
  const eDate = Date.parse(endDate);
  if (sDate > eDate) return -1;
  // 这个判断可以根据需求来确定是否需要加上
  if (sDate === eDate) return 0;
  const days = (eDate - sDate) / (1 * 24 * 60 * 60 * 1000);
  return days;
};

// 根据年龄算日期，传入的格式为 YYYY-MM-DD
export const getAge = (strBirthday) => {
  let returnAge;
  // 根据生日计算年龄
  //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
  let strBirthdayArr = strBirthday.split("-");
  let birthYear = strBirthdayArr[0];
  let birthMonth = strBirthdayArr[1];
  let birthDay = strBirthdayArr[2];

  const d = new Date();
  let nowYear = d.getFullYear();
  let nowMonth = d.getMonth() + 1;
  let nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        let monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; //返回周岁年龄
};

// 格式化本地货币
export const currencyLocales = (price, currency = "USD", locales = "en-US") => {
  const IDRFormatter = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
  });
  return IDRFormatter.format(price);
};

// 获取时间戳 type 是不是 13位的
export const getDateNow = (type = false) => {
  if (type) return Date.now();
  return Math.floor(Date.now() / 1000);
};

export const formatDate1 = (timestamp = "") => {
  if (!timestamp || timestamp == -1) return "";
  if (String(timestamp).length == 10) timestamp = timestamp * 1000;
  const date = new Date(Number(timestamp)); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const currentYear = new Date().getFullYear();
  if (Y != currentYear + "-") {
    return Y + M + D + h + m;
  }
  return M + D + h + m;
};

// 去除中英文括号和括号里面的内容
export const removeParenthesesContent = (str) => {
  return str.replace(/[\[\(\（][^\[\(\（\]\)\）]*[\]\)\）]/g, "");
};
