export const setStorage = (key, value) => {
  // 持久化至本地
  localStorage.setItem(key, value);
};

// 获取本地数据
export const getStorage = (key) => localStorage.getItem(key) || undefined;

// 删除item
export const removeStorage = (key) => localStorage.removeItem(key);

// 清空storage
export const clearStorage = () => localStorage.clear();
