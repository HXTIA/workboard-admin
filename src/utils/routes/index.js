// 处理行为
export const handleRoutes = (routes) => {
  // 功能: -> 接受传进来的数组 -> 给其补齐component返回新的数组
  const res = handleRoute(routes);
  return res;
};

// 处理路由组件引入
function handleRoute(routes) {
  const Routes = [];
  routes.forEach((value) => {
    value.children && value.children.forEach((item) => {
      const route = {
        path: item.uri,
        name: item.name,
        meta: { permission: [] },
        component: () => import(`@/view${item.uri}/index.vue`),
      };

      if (item.children && item.children[0].type === 3) {
        item.children.forEach((value) => {
          const permission = value.permission.split(':')[1];
          route.meta.permission.push(permission);
        });
      }
      Routes.push(route);
    });
  });

  return Routes;
}
