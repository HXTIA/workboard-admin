import router from '@/router';

export default {
  install: (app) => {
    app.directive('permission', (el, binding) => {
      const { action, effect } = binding.value;
      if (!router.currentRoute.value.meta.permission.includes(action)) {
        if (effect === 'disabled') {
          // 如果是禁用添加'disable'样式
          el.__vueParentComponent.props.disabled = true;
        } else {
          // 否则就移除节点
          el.parentNode.removeChild(el);
        }
      }
    });
  }
};
