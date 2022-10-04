// 处理行为
export const handleRoutes = (routes) => {
  // 功能: -> 接受传进来的数组 -> 给其补齐component返回新的数组
  const res = handleRoute(routes);

  return res;
};

// 处理路由组件引入
function handleRoute(routes) {
  const Routes = [];
  routes.map((value) => {
    const route = {
      path: value.uri,
      name: value.name,
      component: () => import(`@/view${value.uri}/index.vue`),
    };

    if (value.children) {
      route.children = handleRoute(value.children);
    }

    return Routes.push(route);
  });

  return Routes;
}
