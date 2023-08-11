// 设置本地数据
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("setLocalStorage error", e);
    return null;
  }
};

// 获取本地数据
export const getLocalStorage = (key) => {
  let res = null;
  try {
    res = localStorage.getItem(key);
    if (res) {
      res = JSON.parse(res);
    }
    return res;
  } catch (e) {
    console.log("getLocalStorage error", localStorage.getItem(key), e);
    return res;
  }
};

// 删除本地数据
export const deleteLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log("deleteLocalStorage error", e);
  }
};
