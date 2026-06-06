export const initialCharacters = {
  liMing: {
    id: 'liMing',
    name: '李明',
    avatar: '👨‍🎓',
    identity: '大学生',
    currentStatus: '准备四六级考试',
    happiness: 50,
    money: 30,
    recentEvents: [],
    relationships: {},
    keywords: ['成长', '工作', '家庭', '城市生活'],
    storyline: '学业'
  },
  wangWu: {
    id: 'wangWu',
    name: '王五',
    avatar: '👨‍🍳',
    identity: '失业青年',
    currentStatus: '寻找工作机会',
    happiness: 40,
    money: 20,
    recentEvents: [],
    relationships: {},
    keywords: ['失业', '创业', '面馆', '逆袭'],
    storyline: '职场'
  },
  chenJuan: {
    id: 'chenJuan',
    name: '陈娟',
    avatar: '👩‍💼',
    identity: '普通上班族',
    currentStatus: '被妈妈催婚中',
    happiness: 45,
    money: 50,
    recentEvents: [],
    relationships: {},
    keywords: ['催婚', '恋爱', '相亲', '成长'],
    storyline: '姻缘'
  }
};

export const initialGods = {
  caishen: {
    id: 'caishen',
    name: '财神',
    avatar: '💰',
    personality: '精明商人',
    contactMethod: '正式信件',
    unlocked: true,
    chatActive: true
  },
  tudigong: {
    id: 'tudigong',
    name: '土地公',
    avatar: '🏠',
    personality: '热心八卦',
    contactMethod: '直接出现',
    unlocked: true,
    chatActive: true
  },
  chenghuang: {
    id: 'chenghuang',
    name: '城隍',
    avatar: '🏛️',
    personality: '正经公务员',
    contactMethod: '正式公文',
    unlocked: true,
    chatActive: true
  },
  yuelao: {
    id: 'yuelao',
    name: '月老',
    avatar: '💕',
    personality: '话唠媒婆',
    contactMethod: '语音消息',
    unlocked: true,
    chatActive: true
  },
  zaowang: {
    id: 'zaowang',
    name: '灶王爷',
    avatar: '🔥',
    personality: '碎嘴顾家',
    contactMethod: '路过顺便说',
    unlocked: true,
    chatActive: true
  },
  tianhou: {
    id: 'tianhou',
    name: '天后娘娘',
    avatar: '👑',
    personality: '温柔慈悲',
    contactMethod: '神谕',
    unlocked: false,
    chatActive: false
  },
  guanqing: {
    id: 'guanqing',
    name: '关公',
    avatar: '⚔️',
    personality: '义薄云天',
    contactMethod: '显圣',
    unlocked: false,
    chatActive: false
  }
};

export const gameConfig = {
  incense: 30,
  power: 40,
  maxPower: 100,
  dailyPowerRecovery: 25,
  incenseToPowerRate: 0.8,
  exchangeCost: 10,
  exchangeAmount: 10,
  emergencyExchangeCost: 20,
  emergencyExchangeAmount: 15,
  wishesPerBatch: 3,
  wishRefreshInterval: 10000
};

export const miniGames = {
  接东西: {
    name: '知识接接乐',
    description: '接到书本加分！',
    duration: 20,
    powerCost: 10
  },
  配对: {
    name: '心心相印',
    description: '配对相同的心形！',
    duration: 20,
    powerCost: 10
  },
  跳台阶: {
    name: '步步高升',
    description: '跳上更高台阶！',
    duration: 20,
    powerCost: 10
  },
  连连看: {
    name: '智慧连连看',
    description: '消除相同图案！',
    duration: 25,
    powerCost: 12
  },
  答题: {
    name: '知识问答',
    description: '答对题目加分！',
    duration: 15,
    powerCost: 8
  },
  堆叠: {
    name: '职场堆叠',
    description: '堆叠箱子到目标！',
    duration: 20,
    powerCost: 10
  }
};

export const godMessages = {
  greeting: [
    {
      id: 'msg_greet_1',
      godId: 'tudigong',
      message: '小神啊，今天天气不错！要不要聊聊凡间的新鲜事？',
      options: [
        { text: '好啊，福爷爷请讲', result: { incense: 5, reply: '哈哈，最近可有不少趣事呢...' } },
        { text: '我忙着处理愿望呢', result: { incense: 0, reply: '好吧，忙完再说~' } }
      ]
    },
    {
      id: 'msg_greet_2',
      godId: 'yuelao',
      message: '哎呀呀！新神上任，要不要我送你几条红线开开眼界？',
      options: [
        { text: '红线是什么？', result: { incense: 8, reply: '这你都不知道？来来来~' } },
        { text: '不用了，谢谢', result: { incense: 2, reply: '客气啥呢~' } }
      ]
    },
    {
      id: 'msg_greet_3',
      godId: 'caishen',
      message: '赵总，最近业务不错啊！要不要投资点香火？',
      options: [
        { text: '怎么投资？', result: { incense: 10, reply: '来来来，我给你讲讲~' } },
        { text: '暂时不需要', result: { incense: 0, reply: '行，有需要随时找我' } }
      ]
    },
    {
      id: 'msg_greet_4',
      godId: 'zaowang',
      message: '新来的小神？要不要尝尝我做的蟠桃酥？',
      options: [
        { text: '好呀！', result: { incense: 6, reply: '哈哈，算你有口福！' } },
        { text: '不用了', result: { incense: 0, reply: '真不给面子...' } }
      ]
    },
    {
      id: 'msg_greet_5',
      godId: 'chenghuang',
      message: '新神好，我是城隍庙主，以后多多关照。',
      options: [
        { text: '请多指教！', result: { incense: 5, reply: '客气了，互相学习' } },
        { text: '嗯', result: { incense: 0, reply: '...' } }
      ]
    }
  ],
  encouragement: [
    {
      id: 'msg_enc_1',
      godId: 'tudigong',
      message: '小神加油！凡人的愿望就靠你了！',
      options: [
        { text: '我会努力的！', result: { incense: 5, reply: '哈哈，有志气！' } },
        { text: '压力好大...', result: { incense: 3, reply: '慢慢来，不着急~' } }
      ]
    },
    {
      id: 'msg_enc_2',
      godId: 'chenghuang',
      message: '按流程办事，不会出错的。',
      options: [
        { text: '明白！', result: { incense: 3, reply: '嗯，态度不错' } },
        { text: '知道了', result: { incense: 0, reply: '...' } }
      ]
    },
    {
      id: 'msg_enc_3',
      godId: 'yuelao',
      message: '做得不错嘛！继续保持这个势头！',
      options: [
        { text: '谢谢月老夸奖！', result: { incense: 6, reply: '哈哈，继续努力！' } },
        { text: '一般般吧', result: { incense: 0, reply: '年轻人不要太谦虚~' } }
      ]
    },
    {
      id: 'msg_enc_4',
      godId: 'caishen',
      message: '财神爷看好你！好好干，香火滚滚来！',
      options: [
        { text: '借你吉言！', result: { incense: 8, reply: '哈哈，等着数香火吧！' } },
        { text: '会的', result: { incense: 3, reply: '嗯，有志气' } }
      ]
    },
    {
      id: 'msg_enc_5',
      godId: 'zaowang',
      message: '加油加油！等你忙完，我给你做顿好吃的！',
      options: [
        { text: '好期待！', result: { incense: 5, reply: '哈哈，一定让你满意！' } },
        { text: '谢谢', result: { incense: 2, reply: '客气啥~' } }
      ]
    }
  ],
  success: [
    {
      id: 'msg_succ_1',
      godId: 'tudigong',
      message: '太棒了！又帮凡人实现了一个愿望！',
      options: [
        { text: '谢谢夸奖！', result: { incense: 5, reply: '继续加油！' } },
        { text: '这是我应该做的', result: { incense: 3, reply: '有觉悟！' } }
      ]
    },
    {
      id: 'msg_succ_2',
      godId: 'yuelao',
      message: '恭喜恭喜！功德又涨了不少啊！',
      options: [
        { text: '借您吉言！', result: { incense: 6, reply: '哈哈，继续努力！' } },
        { text: '嗯', result: { incense: 2, reply: '别谦虚嘛~' } }
      ]
    },
    {
      id: 'msg_succ_3',
      godId: 'caishen',
      message: '不错不错！香火又进账了！',
      options: [
        { text: '托您的福！', result: { incense: 8, reply: '哈哈，继续发财！' } },
        { text: '还好吧', result: { incense: 3, reply: '低调低调~' } }
      ]
    },
    {
      id: 'msg_succ_4',
      godId: 'zaowang',
      message: '干得漂亮！今晚加餐！',
      options: [
        { text: '太好了！', result: { incense: 5, reply: '等着吃大餐吧！' } },
        { text: '谢谢灶王爷', result: { incense: 3, reply: '客气啥~' } }
      ]
    }
  ],
  fail: [
    {
      id: 'msg_fail_1',
      godId: 'tudigong',
      message: '哎呀，这次失手了...别灰心，下次再来！',
      options: [
        { text: '我会继续努力的！', result: { incense: 3, reply: '这就对了！' } },
        { text: '唉...', result: { incense: 0, reply: '别叹气，加油！' } }
      ]
    },
    {
      id: 'msg_fail_2',
      godId: 'chenghuang',
      message: '失败是成功之母，总结经验下次再来。',
      options: [
        { text: '明白！', result: { incense: 3, reply: '嗯，态度很重要' } },
        { text: '知道了', result: { incense: 0, reply: '...' } }
      ]
    },
    {
      id: 'msg_fail_3',
      godId: 'yuelao',
      message: '没事没事，月老给你牵根幸运线！',
      options: [
        { text: '谢谢月老！', result: { incense: 5, reply: '哈哈，下次一定成！' } },
        { text: '好吧', result: { incense: 2, reply: '要有信心嘛~' } }
      ]
    }
  ],
  random: [
    {
      id: 'msg_rand_1',
      godId: 'zaowang',
      message: '今天凡间有户人家做了红烧肉，香飘十里啊~',
      options: [
        { text: '听起来真香', result: { incense: 5, reply: '可不是嘛！' } },
        { text: '这跟我有什么关系', result: { incense: 0, reply: '...吃货的世界你不懂' } }
      ]
    },
    {
      id: 'msg_rand_2',
      godId: 'yuelao',
      message: '最近红线库存有点紧张啊...',
      options: [
        { text: '怎么了？', result: { incense: 5, reply: '凡间单身狗太多了！' } },
        { text: '关我什么事', result: { incense: 0, reply: '哼，没爱心！' } }
      ]
    },
    {
      id: 'msg_rand_3',
      godId: 'caishen',
      message: '昨天梦见财神爷给我托梦了！',
      options: [
        { text: '梦见什么了？', result: { incense: 8, reply: '他说...天机不可泄露！' } },
        { text: '你不就是财神吗', result: { incense: 3, reply: '嘿嘿，我梦到我自己发财了！' } }
      ]
    },
    {
      id: 'msg_rand_4',
      godId: 'tudigong',
      message: '今天有个老太太来拜你呢！',
      options: [
        { text: '真的吗？', result: { incense: 5, reply: '是啊，说你灵验呢！' } },
        { text: '哦', result: { incense: 0, reply: '...你这反应有点冷淡啊' } }
      ]
    },
    {
      id: 'msg_rand_5',
      godId: 'chenghuang',
      message: '注意你的神力消耗，别超标了。',
      options: [
        { text: '知道了', result: { incense: 3, reply: '嗯' } },
        { text: '好烦啊', result: { incense: 0, reply: '态度注意点！' } }
      ]
    },
    {
      id: 'msg_rand_6',
      godId: 'zaowang',
      message: '最近研究了一道新菜式，想不想尝尝？',
      options: [
        { text: '好呀！', result: { incense: 6, reply: '哈哈，等着！' } },
        { text: '忙着呢', result: { incense: 0, reply: '好吧，下次再请你~' } }
      ]
    },
    {
      id: 'msg_rand_7',
      godId: 'yuelao',
      message: '刚看到一对情侣吵架，要不要我去劝劝？',
      options: [
        { text: '快去快去！', result: { incense: 5, reply: '哈哈，看我的！' } },
        { text: '不用管', result: { incense: 0, reply: '好吧...' } }
      ]
    },
    {
      id: 'msg_rand_8',
      godId: 'caishen',
      message: '最近股市行情不错，要不要投资一点？',
      options: [
        { text: '怎么投？', result: { incense: 8, reply: '来来来，我教你~' } },
        { text: '没兴趣', result: { incense: 0, reply: '哎，年轻人不懂理财...' } }
      ]
    },
    {
      id: 'msg_rand_9',
      godId: 'tudigong',
      message: '后山的桃子熟了，要不要去摘几个？',
      options: [
        { text: '好啊！', result: { incense: 5, reply: '哈哈，走起！' } },
        { text: '没空', result: { incense: 0, reply: '好吧，那我自己去~' } }
      ]
    },
    {
      id: 'msg_rand_10',
      godId: 'chenghuang',
      message: '最近凡间治安不错，多亏了你啊！',
      options: [
        { text: '哪里哪里', result: { incense: 3, reply: '谦虚了' } },
        { text: '应该的', result: { incense: 2, reply: '嗯，有担当' } }
      ]
    }
  ],
  groupChat: [
    {
      id: 'msg_group_1',
      godId: 'tudigong',
      message: '各位同僚，新神最近表现不错啊！'
    },
    {
      id: 'msg_group_2',
      godId: 'yuelao',
      message: '是啊是啊，功德涨得很快！'
    },
    {
      id: 'msg_group_3',
      godId: 'caishen',
      message: '财神爷看好你！继续加油！'
    },
    {
      id: 'msg_group_4',
      godId: 'zaowang',
      message: '今晚我做东，大家来尝尝新菜式！'
    },
    {
      id: 'msg_group_5',
      godId: 'chenghuang',
      message: '按规矩办事，一切顺利。'
    },
    {
      id: 'msg_group_6',
      godId: 'tudigong',
      message: '哈哈，灶王爷又要请客了！'
    },
    {
      id: 'msg_group_7',
      godId: 'yuelao',
      message: '我带壶酒来！'
    },
    {
      id: 'msg_group_8',
      godId: 'caishen',
      message: '我出点干货！'
    },
    {
      id: 'msg_group_9',
      godId: 'zaowang',
      message: '那就这么定了！'
    },
    {
      id: 'msg_group_10',
      godId: 'chenghuang',
      message: '嗯，热闹一点也好。'
    },
    {
      id: 'msg_group_11',
      godId: 'yuelao',
      message: '大家大家！本月配对成功率再创新高！感谢各位配合！'
    },
    {
      id: 'msg_group_12',
      godId: 'tudigong',
      message: '月老辛苦了！最近凡间单身狗确实少了不少~'
    },
    {
      id: 'msg_group_13',
      godId: 'caishen',
      message: '香火收入本月也涨了！大家努力有成效！'
    },
    {
      id: 'msg_group_14',
      godId: 'zaowang',
      message: '今天一户凡人家炖了腊猪脚，那个香味飘了三条街…'
    },
    {
      id: 'msg_group_15',
      godId: 'yuelao',
      message: '灶王爷你就知道吃！你的心思都在厨房里~'
    },
    {
      id: 'msg_group_16',
      godId: 'zaowang',
      message: '那不行！吃是头等大事！'
    },
    {
      id: 'msg_group_17',
      godId: 'chenghuang',
      message: '好了好了，不要在工作群里发吃的。'
    },
    {
      id: 'msg_group_18',
      godId: 'tudigong',
      message: '城隍大人，你也是看了嘴馋对吧哈哈哈哈'
    },
    {
      id: 'msg_group_19',
      godId: 'chenghuang',
      message: '…继续工作。'
    },
    {
      id: 'msg_group_20',
      godId: 'caishen',
      message: '玉帝昨天问起咱们辖区的香火报表，大家注意提升服务质量！'
    },
    {
      id: 'msg_group_21',
      godId: 'tudigong',
      message: '收到！最近新神表现不错，我已经多次点赞了！'
    },
    {
      id: 'msg_group_22',
      godId: 'yuelao',
      message: '对对对！那个新神处理姻缘类愿望特别上心，赞一个👍'
    },
    {
      id: 'msg_group_23',
      godId: 'zaowang',
      message: '新神加油！等你忙完，我做一桌好菜给你庆功！'
    }
  ],
  groupChatFail: [
    {
      id: 'msg_gf_1',
      godId: 'tudigong',
      message: '哎，这次没处理好…不过没关系，失败乃成功之母嘛'
    },
    {
      id: 'msg_gf_2',
      godId: 'yuelao',
      message: '下次加油！我多送几根红线给你壮壮胆！'
    },
    {
      id: 'msg_gf_3',
      godId: 'chenghuang',
      message: '总结经验，下次按规程来，不会出问题的。'
    }
  ]
};

export const wishTemplates = {
  liMing: [
    {
      title: '求四六级通过！',
      description: '神明大人！下周就要考四六级了，这已经是我第三次考了...',
      category: '学业',
      gameType: '接东西',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求面试顺利！',
      description: '神明大人！我投了上海一家互联网公司，明天就要面试了！',
      category: '职场',
      gameType: '跳台阶',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求论文通过！',
      description: '神明大人！导师说我的论文还差很多，可是马上就要答辩了...',
      category: '学业',
      gameType: '答题',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求考个好成绩！',
      description: '神明大人！下周就要期末考试了，求你让我考个好成绩吧！',
      category: '学业',
      gameType: '连连看',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求实习offer！',
      description: '神明大人！我投了三十多份实习简历，一个回音都没有，我真的好焦虑啊...',
      category: '职场',
      gameType: '堆叠',
      options: [
        { text: '投递加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '加点运气', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求考研上岸！',
      description: '神明大人！我备考了整整一年，专业课好难，求您让我考上心仪的学校！',
      category: '学业',
      gameType: '答题',
      options: [
        { text: '全力加持', description: '消耗神力18', powerCost: 18, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求和室友关系好！',
      description: '神明大人！我和室友最近因为卫生问题吵架了，宿舍气氛好尴尬...',
      category: '人际',
      gameType: '配对',
      options: [
        { text: '化解矛盾', description: '消耗神力12', powerCost: 12, effect: 'excellent' },
        { text: '稍微缓和', description: '消耗神力6', powerCost: 6, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求家人健康！',
      description: '神明大人！我妈最近体检有些指标不好，在外地读书好担心，求您保佑她！',
      category: '健康',
      gameType: '连连看',
      options: [
        { text: '保佑平安', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微保佑', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    }
  ],
  wangWu: [
    {
      title: '求面试成功！',
      description: '神明大人！今天下午有个很重要的面试，这是我三个月来第一次机会！',
      category: '职场',
      gameType: '跳台阶',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求生意兴隆！',
      description: '神明大人！我的面馆开起来了，可是客人好少...',
      category: '职场',
      gameType: '接东西',
      options: [
        { text: '吸引客人', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求资金周转！',
      description: '神明大人！面馆进货需要钱，求你让我周转一下吧！',
      category: '职场',
      gameType: '配对',
      options: [
        { text: '全力帮忙', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求找个好工作！',
      description: '神明大人！我不想再摆地摊了，求您让我找到一份稳定的工作吧！',
      category: '职场',
      gameType: '堆叠',
      options: [
        { text: '帮他找工作', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '加点运气', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求房租不涨！',
      description: '神明大人！房东说下个月要涨三百块房租，现在就够难了，求你让他打消这个念头！',
      category: '财运',
      gameType: '接东西',
      options: [
        { text: '劝说房东', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '加点运气', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求父母理解我！',
      description: '神明大人！我爸妈总说我没出息，让我回老家找份稳定工作，我不甘心啊...',
      category: '人际',
      gameType: '答题',
      options: [
        { text: '让父母理解', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '缓和关系', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求遇到贵人！',
      description: '神明大人！这条路太难走了，求你给我指一条明路，或者让我遇到帮助我的贵人！',
      category: '职场',
      gameType: '配对',
      options: [
        { text: '引荐贵人', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '增加运气', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求顾客回头！',
      description: '神明大人！面馆上次有个大客户，吃了一次就没再来，求你让他想起我的面！',
      category: '职场',
      gameType: '接东西',
      options: [
        { text: '勾起食欲', description: '消耗神力12', powerCost: 12, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力6', powerCost: 6, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    }
  ],
  chenJuan: [
    {
      title: '求我妈别催婚！',
      description: '神明大人！我妈今天又给我安排了三个相亲，我才28啊！',
      category: '姻缘',
      gameType: '配对',
      options: [
        { text: '让妈妈消停', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微缓解', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求相亲顺利！',
      description: '神明大人！我妈又给我安排了相亲，希望这次能遇到个正常人...',
      category: '姻缘',
      gameType: '配对',
      options: [
        { text: '遇到合适的', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让气氛不尴尬', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求谈恋爱！',
      description: '神明大人！看着闺蜜都结婚生子了，我也好想有个伴...',
      category: '姻缘',
      gameType: '配对',
      options: [
        { text: '红线牵缘', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '增加桃花运', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求工作顺利！',
      description: '神明大人！最近工作压力好大，求你让我工作顺利一点吧！',
      category: '职场',
      gameType: '答题',
      options: [
        { text: '让工作顺利', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求升职加薪！',
      description: '神明大人！我在公司熬了整整三年，同批进来的同事都升职了，就我还是原地踏步...',
      category: '职场',
      gameType: '跳台阶',
      options: [
        { text: '全力加持', description: '消耗神力18', powerCost: 18, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求遇到真命天子！',
      description: '神明大人！相了这么多次亲不是妈宝男就是凤凰男，我只想找个正常的人谈恋爱！',
      category: '姻缘',
      gameType: '连连看',
      options: [
        { text: '牵一根好红线', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '增加缘分', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求买到限量包！',
      description: '神明大人！那个限量款手袋今天正式发售，求你让我抢到！就一个！',
      category: '财运',
      gameType: '接东西',
      options: [
        { text: '助她抢购', description: '消耗神力12', powerCost: 12, effect: 'excellent' },
        { text: '加点手气', description: '消耗神力6', powerCost: 6, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求朋友不内卷！',
      description: '神明大人！我朋友圈里大家都在晒加班、晒证书，好有压力，求你让我内心平静！',
      category: '健康',
      gameType: '配对',
      options: [
        { text: '赐她平静', description: '消耗神力10', powerCost: 10, effect: 'excellent' },
        { text: '稍微缓解', description: '消耗神力5', powerCost: 5, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    }
  ],
  random: [
    {
      title: '求财运！',
      description: '神明大人！最近手气不太好，求您赐我点财运吧！',
      category: '财运',
      gameType: '接东西',
      options: [
        { text: '赐你财运', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '加点运气', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求健康！',
      description: '神明大人！最近身体不太舒服，求您保佑我健康平安！',
      category: '健康',
      gameType: '配对',
      options: [
        { text: '保佑健康', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微保佑', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求考试通过！',
      description: '神明大人！明天就要考试了，求您让我顺利通过！',
      category: '学业',
      gameType: '答题',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求今天一切顺利！',
      description: '神明大人！今天有好多重要的事要做，求你让一切都顺顺利利的！',
      category: '运气',
      gameType: '配对',
      options: [
        { text: '赐你好运', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微加持', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求找到停车位！',
      description: '神明大人！我开车找停车位找了半个小时了，快要迟到了，救救我！',
      category: '运气',
      gameType: '接东西',
      options: [
        { text: '腾出车位', description: '消耗神力10', powerCost: 10, effect: 'excellent' },
        { text: '加点运气', description: '消耗神力5', powerCost: 5, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求减肥成功！',
      description: '神明大人！我已经节食一周了，体重纹丝不动，求您帮帮我！',
      category: '健康',
      gameType: '接东西',
      options: [
        { text: '加速代谢', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    }
  ]
};

export const initialWishes = [
  {
    id: 'wish_1',
    characterId: 'liMing',
    templateIndex: 0,
    ...wishTemplates.liMing[0]
  },
  {
    id: 'wish_2',
    characterId: 'wangWu',
    templateIndex: 0,
    ...wishTemplates.wangWu[0]
  },
  {
    id: 'wish_3',
    characterId: 'chenJuan',
    templateIndex: 0,
    ...wishTemplates.chenJuan[0]
  }
];

export const divineTitles = [
  { threshold: 0, title: '懵懂新神', description: '刚上任的新神明' },
  { threshold: 25, title: '香火运营大师', description: '深谙香火之道' },
  { threshold: 50, title: '爱管闲事真君', description: '热心肠的神明' },
  { threshold: 75, title: '众生客服神', description: '有求必应' },
  { threshold: 100, title: '万神殿至尊', description: '众神之王' }
];

export const divineAttributes = [
  { key: 'order', name: '秩序', opposite: '混沌' },
  { key: 'mercy', name: '慈悲', opposite: '功利' },
  { key: 'involvement', name: '介入', opposite: '佛系' },
  { key: 'rational', name: '理性', opposite: '感性' }
];

export const godChatStarters = {
  caishen: [
    {
      topic: '💰 最近香火怎么样？',
      message: '财神爷，最近香火收入怎么样啊？',
      reply: '哈哈，还不错！不过嘛，要想香火更旺，得多帮凡人实现财运愿望！本财神保证，好好干，钱财滚滚来！',
      incense: 5
    },
    {
      topic: '📈 理财建议',
      message: '财神爷，您有什么理财秘诀吗？',
      reply: '哎呀，你问到点子上了！第一：积少成多；第二：善财童子才能留住财；第三嘛……那是商业机密，哈哈！',
      incense: 8
    },
    {
      topic: '🎯 求发财秘诀',
      message: '财神爷，能不能赐我发财秘诀？',
      reply: '发财的秘诀就是——勤劳！还有，多给我烧香！哈哈，玩笑玩笑。其实嘛，努力+机遇+贵人，缺一不可。',
      incense: 6
    }
  ],
  tudigong: [
    {
      topic: '🏘️ 最近凡间有什么新鲜事？',
      message: '土地爷，最近凡间有什么新鲜事吗？',
      reply: '哎呦，新鲜事多了去了！昨天那条巷子新开了家奶茶店，排队排到外面去了！还有啊，张家的儿子找到工作了，他妈都哭了……',
      incense: 4
    },
    {
      topic: '🌿 辖区管理心得',
      message: '土地爷，管理这一片辖区辛苦吗？',
      reply: '哈哈，辛苦中也有乐趣嘛！看着凡人们日子一天天变好，比什么都开心。你这个新神也要加油，咱们一起把辖区搞好！',
      incense: 5
    },
    {
      topic: '👴 有没有什么小故事？',
      message: '土地爷，能讲个凡间的有趣故事吗？',
      reply: '有有有！上次有个老头，天天来拜我，求我让他彩票中奖。我数了数，他买彩票花的钱都够开个小卖部了……哈哈哈！',
      incense: 6
    }
  ],
  yuelao: [
    {
      topic: '💕 红线最近好用吗？',
      message: '月老，你的红线最近效果怎么样？',
      reply: '嗐，别提了！最近凡间单身率高啊，红线都供不应求！不过嘛，月老出手，成功率杠杠的！你要不要也来一根？',
      incense: 6
    },
    {
      topic: '💌 情感小课堂',
      message: '月老，能给我讲讲姻缘是怎么运作的吗？',
      reply: '好问题！月老我说，缘分这事啊，讲究天时地利人和。红线是外因，内因还得看两人的心。所以啊，帮凡人处理姻缘愿望要用心！',
      incense: 8
    },
    {
      topic: '🎊 有成功案例吗？',
      message: '月老，最近有哪对配成了？',
      reply: '哎呦，上个月就配了好几对！其中有个案例特别感人，两个人因为等公交认识的，后来一聊竟然是老乡！这都是月老我的功劳哈哈！',
      incense: 5
    }
  ],
  zaowang: [
    {
      topic: '🍜 最近研究了什么菜？',
      message: '灶王爷，最近有没有研究什么新菜？',
      reply: '哎！你问到我最得意的地方了！最近研究了一道神仙豆腐——用凡间的嫩豆腐配上露水，再淋上用百花酿的汁，那个鲜啊！',
      incense: 5
    },
    {
      topic: '🏠 家里有什么八卦？',
      message: '灶王爷，你天天在各家厨房里，有没有听到什么八卦？',
      reply: '哈哈哈，这可不能乱说！不过嘛，悄悄告诉你——李家那个媳妇其实特别顾家，就是不会表达。王家的儿子啊，其实偷偷学厨艺呢！',
      incense: 7
    },
    {
      topic: '🎁 要不要请吃东西？',
      message: '灶王爷，说好的好吃的呢？',
      reply: '来来来！今天做了蟠桃酥，还有龙眼糯米糕！等你今天的愿望都处理完了，来我这里吃大餐，管够！',
      incense: 6
    }
  ],
  chenghuang: [
    {
      topic: '📋 最近有什么工作要注意？',
      message: '城隍大人，最近有什么需要注意的事项吗？',
      reply: '嗯，有几点提醒：第一，处理愿望要公平，不能因为人可爱就偏心；第二，神力消耗要合理；第三，按时上报功德数据。明白了吗？',
      incense: 3
    },
    {
      topic: '⚖️ 如何判断一个愿望该不该批？',
      message: '城隍大人，什么样的愿望值得全力帮忙？',
      reply: '这个问题很好。凡人的愿望，看其出发点是否善良，看其努力程度，看其对社会是否有益。如果凡人努力过但还需要帮助，那就值得。',
      incense: 5
    },
    {
      topic: '🌆 辖区的整体情况如何？',
      message: '城隍大人，咱们辖区整体情况怎么样？',
      reply: '总体平稳。不过近年凡间竞争压力大，年轻人愿望增多。我们需要更多资源投入到职场和学业类愿望的处理上。你要多用心。',
      incense: 4
    }
  ]
};

// 神一阵鬼一阵 - 调剂型还愿
export const trickyWishOutcomes = [
  { trigger: ['工资', '加薪', '涨工资'], result: '公司给涨了500块，但同时取消了所有补贴和年终奖，算下来一年倒亏2000。' },
  { trigger: ['孩子', '听话', '懂事'], result: '孩子突然高烧40度，烧得迷迷糊糊，别说顶嘴，连话都说不出来了。' },
  { trigger: ['咖啡', '现磨'], result: '同事送了一台全自动咖啡机，但从此每天上班第一件事就是帮全部门12个人轮流做咖啡。' },
  { trigger: ['瘦', '减肥', '体重', '120斤'], result: '大病一场，上吐下泻一周，确实瘦到了120斤，头发也掉了三分之一。' },
  { trigger: ['暗恋', '喜欢', '相处', '在一起'], result: '公司重组，和暗恋对象分到同一个项目组，但对方成了直属领导，天天骂方案烂。' },
  { trigger: ['彩票', '中奖', '财运'], result: '中了5块钱，但那张彩票是花了10块钱让跑腿小哥代买的，倒赔5块。' },
  { trigger: ['休息', '周末', '别打扰'], result: '周五下班手机掉进马桶坏了，彻底失联两天，确实没人打扰，但也刷不了剧、点不了外卖。' },
  { trigger: ['空调', '吹头'], result: '空调出风口被维修工直接堵死了，整个房间再也不制冷，变成蒸笼。' },
  { trigger: ['同事', '闭嘴', '安静'], result: '那位同事突发急性喉炎失声两周，但养病期间把所有工作都甩给来做。' },
  { trigger: ['陪父母', '回家', '亲情'], result: '被公司裁员，打包回老家住了半年，每天被亲妈嫌碍事、催相亲。' }
];

// 通用兜底
export const genericTrickyOutcomes = [
  '愿望确实实现了，但代价是另一件烦心事。',
  '神仙今天有点皮，结果弄拧了，凡人哭笑不得。',
  '半瓶神力倒错方向了，凡人收到了一个奇怪的"惊喜"。'
];

export const triviaQuestions = [
  { question: '中国四大名著是？', answer: '红楼梦西游记水浒传三国演义', options: ['红楼梦西游记水浒传三国演义', '金瓶梅西厢记牡丹亭桃花扇', '封神演义聊斋志异儒林外史'] },
  { question: '一年有几个季节？', answer: '4', options: ['4', '2', '3'] },
  { question: '水的化学式是？', answer: 'H2O', options: ['H2O', 'CO2', 'O2'] },
  { question: '地球是圆的吗？', answer: '是', options: ['是', '不是', '不知道'] },
  { question: '人类有几只手？', answer: '2', options: ['2', '1', '3'] },
  { question: '太阳从哪边升起？', answer: '东边', options: ['东边', '西边', '北边'] },
  { question: '1+1等于几？', answer: '2', options: ['2', '3', '1'] },
  { question: '月亮绕着什么转？', answer: '地球', options: ['地球', '太阳', '火星'] }
];
