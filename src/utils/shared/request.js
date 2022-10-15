// 构造新建和编辑的formdata
export const createFormData = (form) => {
  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    const value = form[key];
    if (key === 'pictureFiles' || key === 'picturesFiles') {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
