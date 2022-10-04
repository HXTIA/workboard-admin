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
    deadline: Date.now(),
    pictureFiles: [
      'https://img1.baidu.com/it/u=2475127973,1009717621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
      'https://img1.baidu.com/it/u=2475127973,1009717621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
      'https://img1.baidu.com/it/u=2475127973,1009717621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
      'https://p3-passport.byteimg.com/img/user-avatar/f3446fd0d9764da159a154bddb3793ff~180x180.awebp'
    ]
  },
  {
    id: 2,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-2班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业二', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 3,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-3班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业三', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 4,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-4班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业四', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 5,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-5班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业五', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 6,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-6班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 7,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-6班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 8,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-6班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 9,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-6班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  },
  {
    id: 10,
    time: '2018-4-12 13:34:22',
    title: '计算机网络-6班',
    detail: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
    tag: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
    deadline: '2021-4-12 13:34:22',
    pictureFiles: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    ]
  }
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
    id: 1,
    title: '系统数据',
    name: 'systemData',
    uri: '/main/data',
    permission: '',
    type: 1,
    sn: 0,
    icon: 'User',
    parentId: 0,
    children: [
      {
        id: 2,
        title: '系统总览',
        name: 'systemOverall',
        uri: '/main/data/system/overall',
        permission: '',
        type: 2,
        sn: 0,
        icon: '',
        parentId: 1,
      },
      {
        id: 3,
        title: '班级统计',
        name: 'classStatistics',
        uri: '/main/data/system/classStatistics',
        permission: '',
        type: 3,
        sn: 0,
        icon: '',
        parentId: 1,
      },
    ],
  },
  {
    id: 4,
    title: '管理员管理',
    name: 'adminAdministrator',
    uri: '/admin/data',
    permission: '',
    type: 1,
    sn: 0,
    icon: 'User',
    parentId: 0,
    children: [
      {
        id: 5,
        title: '全部成员',
        name: 'allPeople',
        uri: '/admin/data/overall',
        permission: '',
        type: 2,
        sn: 0,
        icon: '',
        parentId: 4,
      },
      {
        id: 6,
        title: '权限分配',
        name: 'adminProfile',
        uri: '/admin/data/assignment',
        permission: '',
        type: 3,
        sn: 0,
        icon: '',
        parentId: 4,
      },
    ],
  },
];
