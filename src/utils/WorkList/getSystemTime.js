// 获取系统时间
const getSystemTime = () => {
  // 实例化日期类
  const time = new Date();
  const str1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
  return str1 + ' ' + hours + ':' + minutes + ':' + seconds;
};
export default getSystemTime;
