export const timeFormat = (currentTime) => {
  const nowDay = new Date(currentTime);
  const year = nowDay.getFullYear();
  const month = nowDay.getMonth() + 1;
  const day = nowDay.getDate();
  const hours = nowDay.getHours();
  const minutes = nowDay.getMinutes();
  const format = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return format;
};
