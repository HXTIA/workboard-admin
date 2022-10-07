export const timelineColor = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#8B00FF',
  '#000000',
  '#FFFFFF'
];

// 对话框校验规则
export const rules = reactive({
  title: [{ required: true, message: '不能为空', trigger: 'change' }],
  text: [{ required: true, message: '不能为空', trigger: 'blur' }],
  deadline: [{ required: true, message: '不能为空', trigger: 'change' }]
});

export const workList = [
  {
    id: 1,
    time: Date.now(),
    title: '我是id1',
    detail: '这是一段简短的描述，这是一段简短的描述，这是一段简短的描述',
    tag: ['作业二'],
    semesterId: 1,
    deadline: Date.now(),
    courseId: 1,
    pictureFiles: [
      'https://img1.baidu.com/it/u=2475127973,1009717621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
      'https://p3-passport.byteimg.com/img/user-avatar/f3446fd0d9764da159a154bddb3793ff~180x180.awebp'
    ]
  },
  {
    id: 2,
    time: Date.now(),
    title: '我是id2',
    detail: '这是一段简短的描述',
    tag: ['作业1'],
    semesterId: 1,
    deadline: Date.now(),
    courseId: 1,
    pictureFiles: [
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667701601&t=14b70dc0967074e1fbca70e971eab394',
    ]
  },
  // {
  //   id: 3,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-3班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业三', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 4,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-4班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业四', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 5,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-5班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业五', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 6,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-6班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 7,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-6班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 8,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-6班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 9,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-6班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // },
  // {
  //   id: 10,
  //   time: '2018-4-12 13:34:22',
  //   title: '计算机网络-6班',
  //   detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
  //   tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
  //   deadline: '2021-4-12 13:34:22',
  //   pictureFiles: [
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  //   ]
  // }
];

export const courseClass = [
  {
    name: '21级第一教学班',
    courseId: 1
  },
  {
    name: '21级第二教学班',
    courseId: 2
  },
  {
    name: '20级第一教学班',
    courseId: 3
  },
  {
    name: '20级第二教学班',
    courseId: 4
  },
  {
    name: '22级第一教学班',
    courseId: 5
  },
  {
    name: '22级第二教学班',
    courseId: 6
  },
  {
    name: '大英92班',
    courseId: 7
  },
  {
    name: '大英91班',
    courseId: 8
  }
];

export const fileList = [

];

export const dynamicRoutes = [
  {
    id: 2,
    name: '系统管理',
    uri: '/main/system',
    permission: '',
    type: 1,
    sn: 0,
    icon: 'Setting',
    parentId: 0,
    children: [
      {
        id: 10,
        name: '角色管理',
        uri: '/main/system/role',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'Avatar',
        parentId: 2,
        children: [
          {
            id: 26,
            name: '创建角色',
            uri: '',
            permission: 'sysRole:create',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 10
          },
          {
            id: 25,
            name: '删除角色',
            uri: '',
            permission: 'sysRole:delete',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 10
          },
          {
            id: 24,
            name: '修改角色',
            uri: '',
            permission: 'sysRole:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 10
          },
          {
            id: 23,
            name: '查询角色',
            uri: '',
            permission: 'sysRole:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 10
          }
        ]
      },
      {
        id: 8,
        name: 'B端用户管理',
        uri: '/main/system/adminUser',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'User',
        parentId: 2,
        children: [
          {
            id: 19,
            name: '创建B端用户',
            uri: '',
            permission: 'sysAdminUser:create',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 8
          },
          {
            id: 18,
            name: '删除B端用户',
            uri: '',
            permission: 'sysAdminUser:delete',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 8
          },
          {
            id: 17,
            name: '修改B端用户',
            uri: '',
            permission: 'sysAdminUser:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 8
          },
          {
            id: 16,
            name: '查询B端用户',
            uri: '',
            permission: 'sysAdminUser:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 8
          }
        ]
      },
      {
        id: 7,
        name: '组织管理',
        uri: '/main/system/organization',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'Service',
        parentId: 2,
        children: [
          {
            id: 15,
            name: '修改组织',
            uri: '',
            permission: 'sysOrganization:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 7
          },
          {
            id: 14,
            name: '查询组织',
            uri: '',
            permission: 'sysOrganization:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 7
          }
        ]
      },
      {
        id: 9,
        name: 'C端用户管理',
        uri: '/main/system/user',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'UserFilled',
        parentId: 2,
        children: [
          {
            id: 22,
            name: '删除C端用户',
            uri: '',
            permission: 'sysUser:delete',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 9
          },
          {
            id: 21,
            name: '修改C端用户',
            uri: '',
            permission: 'sysUser:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 9
          },
          {
            id: 20,
            name: '查询C端用户',
            uri: '',
            permission: 'sysUser:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 9
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: '班级中心',
    uri: '/class/center',
    permission: '',
    type: 1,
    sn: 0,
    icon: 'Operation',
    parentId: 0,
    children: [
      {
        id: 12,
        name: '教学班级',
        uri: '/class/center/education',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'View',
        parentId: 3,
        children: [
          {
            id: 31,
            name: '查询教学班',
            uri: '',
            permission: 'clsEducation:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 12
          },
          {
            id: 32,
            name: '修改教学班',
            uri: '',
            permission: 'clsEducation:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 12
          },
          {
            id: 33,
            name: '删除教学班',
            uri: '',
            permission: 'clsEducation:delete',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 12
          },
          {
            id: 34,
            name: '创建教学班',
            uri: '',
            permission: 'clsEducation:create',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 12
          }
        ]
      },
      {
        id: 11,
        name: '行政班级',
        uri: '/class/center/executive',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'View',
        parentId: 3,
        children: [
          {
            id: 27,
            name: '查询行政班',
            uri: '',
            permission: 'clsExecutive:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 11
          },
          {
            id: 28,
            name: '修改行政班',
            uri: '',
            permission: 'clsExecutive:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 11
          },
          {
            id: 29,
            name: '删除行政班',
            uri: '',
            permission: 'clsExecutive:delete',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 11
          },
          {
            id: 30,
            name: '创建行政班',
            uri: '',
            permission: 'clsExecutive:create',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 11
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: '作业中心',
    uri: '/work/center',
    permission: '',
    type: 1,
    sn: 0,
    icon: 'Document',
    parentId: 0,
    children: [
      {
        id: 13,
        name: '作业管理',
        uri: '/work/center/manage',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'Edit',
        parentId: 4,
        children: [
          {
            id: 35,
            name: '查询作业',
            uri: '',
            permission: 'workManage:read',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 13
          },
          {
            id: 36,
            name: '修改作业',
            uri: '',
            permission: 'workManage:update',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 13
          },
          {
            id: 37,
            name: '删除作业',
            uri: '',
            permission: 'workManage:delete',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 13
          },
          {
            id: 38,
            name: '创建作业',
            uri: '',
            permission: 'workManage:create',
            type: 3,
            sn: 0,
            icon: '',
            parentId: 13
          }
        ]
      }
    ]
  },
  {
    id: 1,
    name: '系统数据',
    uri: '/main',
    permission: '',
    type: 1,
    sn: 0,
    icon: 'Odometer',
    parentId: 0,
    children: [
      {
        id: 6,
        name: '班级统计',
        uri: '/main/system/classStatistics',
        permission: '',
        type: 2,
        sn: 0,
        icon: 'PieChart',
        parentId: 1
      },
      {
        id: 5,
        name: '系统总揽',
        uri: '/main/system/overall',
        permission: '',
        type: 2,
        sn: 0,
        icon: '',
        parentId: 1
      }
    ]
  }
];
