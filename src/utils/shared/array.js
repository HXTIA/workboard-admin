// 数组扁平化
export const flatten = (array) => {
  const result = [];
  array.forEach((value) => {
    if (value.children) {
      result.push(...flatten(value.children));
    }
    result.push(value);
  });
  return result;
};
