import request from '@/services';
import { handleAuthPermission } from '@/utils/routes/handlePermission.js';

// import { createFormData } from '@/utils/shared/request.js';

// 获取角色列表
export const getRoleList = async () => {
  const { data } = await request({
    url: '/admin/roles/searchList',
    method: 'GET',
  });

  return data || [];
};

// 发起新建角色请求
export const postCreateRole = async ({ name, intro }, resource) => {
  const resourceIds = handleResourceIds(resource);
  const { code } = await request({
    url: '/admin/roles/create',
    method: 'POST',
    data: {
      name,
      intro,
      resourceIds
    }
  });
  return code === 1;
};

// 删除角色
export const postRemoveRole = async (ids) => {
  const { code } = await request({
    url: '/admin/roles/remove',
    method: 'POST',
    params: {
      ids
    }
  });
  return code === 1;
};

// 发起更新角色请求
export const postUpdateRole = async ({ name, intro, id }, resource) => {
  const resourceIds = handleResourceIds(resource);
  const { code } = await request({
    url: '/admin/roles/update',
    method: 'POST',
    data: {
      name,
      intro,
      id,
      resourceIds
    }
  });
  return code === 1;
};

// 请求角色资源列表并处理
export const getSearchMenu = async (roleIds) => {
  const { data } = await request({
    url: '/admin/resources/searchMenu',
    method: 'GET',
    params: {
      roleIds
    }
  });

  return handleResource(data);
};

// 处理资源列表 -> 去重
function handleResourceIds(resourceIds) {
  const idsArray = [];
  resourceIds.forEach((value) => {
    idsArray.push(...value);
  });
  return [...new Set(idsArray)];
}

// 处理请求来的资源列表 -> 整理为二维数组数据
function handleResource(data) {
  const authPermission = handleAuthPermission(data);

  // 处理完资源列表 -> 全部转换为二维数组
  const resources = Array.from(authPermission);

  // 接收数组
  const endArray = [];
  resources.forEach((value) => {
    const key = value[0];
    const arrayValue = value[1];

    // 如果是数组就继续遍历取值
    if (Array.isArray(arrayValue)) {
      arrayValue.forEach((item) => {
        const temp = [];
        temp.push(key.originId);
        temp.push(key.parentId);
        temp.push(item.id);
        endArray.push(temp);
      });
    } else {
      // 存在没有permission的模块直接push进originId和parentId
      const temp = [];
      temp.push(key.originId);
      temp.push(key.parentId);
      endArray.push(temp);
    }
  });
  return endArray;
}
