export const handleAuthPermission = (data) => {
  const authPermission = new Map();
  data.forEach((value) => {
    const navMenu = value.children || [];
    navMenu.forEach((item) => {
      // 构造权限列表
      const obj = {
        originId: value.id,
        originName: value.name,
        parentId: item.id,
        parentName: item.name,
      };
      authPermission.set(obj, item.children);
    });
  });
  return authPermission;
};
