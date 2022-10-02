// 传递作业详情信息(由于双向绑定的问题，如果正常赋值会导致两个数据绑定到一起)
const deliveryDetails = (a, b) => {
  a.time = JSON.parse(JSON.stringify(b.time));
  a.title = JSON.parse(JSON.stringify(b.title));
  a.text = JSON.parse(JSON.stringify(b.text));
  a.dynamicTags = JSON.parse(JSON.stringify(b.dynamicTags));
  a.deadline = JSON.parse(JSON.stringify(b.deadline));
  a.image = JSON.parse(JSON.stringify(b.image));
};
export default deliveryDetails;
