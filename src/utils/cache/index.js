import { ls } from '@/utils/secureLS';

export const setStorage = (key, value) => {
  console.log(value, '存储本地');
  // 持久化至本地
  localStorage.setItem(key, JSON.stringify(value));
};

// 获取本地数据
export const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || undefined;
  } catch (error) {
    return ls.get(key);
  }
};

// 删除item
export const removeStorage = (key) => localStorage.removeItem(key);

// 清空storage
export const clearStorage = () => localStorage.clear();
