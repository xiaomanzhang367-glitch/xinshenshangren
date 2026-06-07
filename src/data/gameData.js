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
    duration: 35,
    powerCost: 10
  },
  配对: {
    name: '心心相印',
    description: '配对相同的心形！',
    duration: 35,
    powerCost: 10
  },
  跳台阶: {
    name: '步步高升',
    description: '跳上更高台阶！',
    duration: 40,
    powerCost: 10
  },
  连连看: {
    name: '开心消消乐',
    description: '相邻交换3连消除！',
    duration: 45,
    powerCost: 12
  },
  答题: {
    name: '知识问答',
    description: '答对题目加分！',
    duration: 30,
    powerCost: 8
  },
  点灯: {
    name: '功德点灯',
    description: '按顺序点亮莲花灯！',
    duration: 40,
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
      description: '神明大人！下周就要考四六级了，这已经是我第三次考了，再不过我妈要把我送去山里禅修...',
      category: '学业',
      gameType: '接东西',
      options: [
        { text: '全力加持', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求别再梦见高考！',
      description: '已经毕业三年了，每天还在梦里被监考老师收卷！求神明把我的高考记忆封印起来！',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '封印记忆', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '调成快乐版', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我的实习被转正',
      description: '已经实习四个月了，HR天天画饼，但我已经能背出公司的所有故事会版本了...求神明显灵！',
      category: '职场',
      gameType: '跳台阶',
      options: [
        { text: '让HR说人话', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '加点运气', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我能看见的"幸运数字"是真的',
      description: '神明大人！我突然能看到陌生人头顶飘着数字，越亮的数字越大。这是开光了还是脑子出问题了？',
      category: '玄学',
      gameType: '答题',
      options: [
        { text: '确认是开光', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '让他看清规则', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求论文答辩别被怼',
      description: '导师说我的论文像"小学生的日记"，明天就要答辩了！神明大人救我！',
      category: '学业',
      gameType: '答题',
      options: [
        { text: '让评委生病请假', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让我口才爆表', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我暗恋的人也暗恋我',
      description: '我们做同桌3年了，她还以为我是直的(其实我是直的)。求神明让她主动!!!',
      category: '姻缘',
      gameType: '配对',
      options: [
        { text: '直接告白', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '增加桃花气场', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求室友别再煮螺蛳粉',
      description: '我快被熏吐了，宿舍气味已经渗进我的羽绒服。求神明让他改吃别的，要是能让他爱上吃草那就更好了！',
      category: '生活',
      gameType: '接东西',
      options: [
        { text: '让他爱上草', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让他短暂失嗅', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我那只乌龟开口说话',
      description: '我感觉它每天都用很有戏的眼神盯着我，我觉得它一定有话要对我说。神明能让它开口吗？',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '赋予言语', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '只让它唱歌', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求老板今天别让我开摄像头',
      description: '我已经三天没洗头了！并且穿着花裤衩！主管说今天必须开摄像头开会！神明救我！',
      category: '职场',
      gameType: '跳台阶',
      options: [
        { text: '让全公司断网', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让我的摄像头坏', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我前世的记忆',
      description: '神明大人，最近老梦见自己在战国时代当过将军。我能不能确认一下我是不是穿越人士？',
      category: '玄学',
      gameType: '答题',
      options: [
        { text: '解锁全部前世', description: '消耗神力25', powerCost: 25, effect: 'excellent' },
        { text: '小小提示一下', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求亲戚别问我工资',
      description: '过年回家被堂哥堂嫂围攻了三圈，我说月薪3000他们都笑我，我说月薪3万他们以为我吹牛，求神明！',
      category: '家庭',
      gameType: '配对',
      options: [
        { text: '让他们集体失忆', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让我变隐身', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我抢到周杰伦的演唱会票',
      description: '已经守了三年了，求神明开个外挂！票贩子的票贵到能让我爸妈拿来骂我半年！',
      category: '运气',
      gameType: '接东西',
      options: [
        { text: '直接安排', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '加点手速', description: '消耗神力10', powerCost: 10, effect: 'normal' },
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
      title: '求面馆的房租别涨',
      description: '房东那个老狐狸看我生意稍微好一点就要涨租，求神明让他梦见祖宗显灵叫他别涨！',
      category: '职场',
      gameType: '答题',
      options: [
        { text: '托梦显灵', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让我嘴皮溜', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求救下那只受伤的小狐狸',
      description: '我刚才在后山看到一只受伤的红毛狐狸，眼神特别灵，感觉它能听懂人话！求神明救它！',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '神力治愈', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '送它草药', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求面馆能上抖音热门',
      description: '神明，我研发了"麻辣螺蛳鸭血粉丝面"，结果客人觉得是黑暗料理。求让流量来救我！',
      category: '职场',
      gameType: '接东西',
      options: [
        { text: '一夜爆火', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '小红书出圈', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求老婆别再让我刷碗了',
      description: '已经连续刷了37天了！我的手都泡发了！求神明给我一个洗碗机或者一段假期！',
      category: '家庭',
      gameType: '配对',
      options: [
        { text: '老婆心情大好', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让碗自己跳', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我儿子别在小学就早恋',
      description: '神明！我儿子才7岁，今天回家说他要给班里的"女神"送礼物！我什么时候有这么早熟的儿子的？！',
      category: '家庭',
      gameType: '跳台阶',
      options: [
        { text: '让他先学习', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让女神转学', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求银行别再打贷款电话',
      description: '我已经3年没贷过款了！但他们每天还打10个电话！求神明让他们把我的号码弄丢！',
      category: '生活',
      gameType: '答题',
      options: [
        { text: '号码消失', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让电话失灵', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求让那只小狐狸能开口说话',
      description: '神明，我救的那只狐狸眼神越来越灵，我感觉它修炼成精了！求它开口跟我说一句话！',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '完全开口', description: '消耗神力25', powerCost: 25, effect: 'excellent' },
        { text: '让它点头摇头', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求父亲来我的面馆看一眼',
      description: '我爸说我开面馆是没出息，三年没来看过。求神明让他来一次，骂我一顿都行...',
      category: '家庭',
      gameType: '配对',
      options: [
        { text: '托梦让他来', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让他经过', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我去年丢的金链子能回来',
      description: '是我妈给的传家宝！我把它弄丢在某个出租车上，已经找了一年了。求神明显灵！',
      category: '生活',
      gameType: '接东西',
      options: [
        { text: '一夜归来', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '指引方向', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我能戒掉熬夜刷短视频',
      description: '我都38了！每天凌晨3点才睡！但是手指它不听我的啊！求神明把我的手指封了！',
      category: '生活',
      gameType: '跳台阶',
      options: [
        { text: '一觉睡到天亮', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微帮忙', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求能跟去世的妈说一句话',
      description: '我都不知道她想我没。神明...就一句话也行，我想告诉她我现在过得还可以...',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '托梦相见', description: '消耗神力25', powerCost: 25, effect: 'excellent' },
        { text: '只让我感觉她在', description: '消耗神力10', powerCost: 10, effect: 'normal' },
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
      title: '求外婆的回信能再来一次',
      description: '神明，三个月前我寄了一封信给已经去世的外婆。结果上周收到了回信，里面写"咸鱼别熬太晚"，是外婆的字！',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '让外婆再回信', description: '消耗神力25', powerCost: 25, effect: 'excellent' },
        { text: '让我能再寄一次', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我那个相亲对象不是变态',
      description: '今天又是闺蜜推荐的。前三个都让我怀疑人生：一个让我帮他写论文，一个让我借钱，一个直接说"做我老婆"。求一个正常人！',
      category: '姻缘',
      gameType: '配对',
      options: [
        { text: '送来真命天子', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '至少是正常人', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求老板别再让我加班了',
      description: '已经连续加班17天了！我都开始幻觉听见老板的声音了！求神明让他生个小病请假一周！',
      category: '职场',
      gameType: '跳台阶',
      options: [
        { text: '让老板感冒', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让他迟到', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我家阳台的窗户能再打开',
      description: '从某天开始，我家阳台的窗户怎么都打不开。我隔壁阿姨说是有"东西"住进来了。求神明帮我看看！',
      category: '玄学',
      gameType: '答题',
      options: [
        { text: '送走那东西', description: '消耗神力25', powerCost: 25, effect: 'excellent' },
        { text: '问问它要什么', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求闺蜜婚礼别让我做伴娘',
      description: '我是单身，让我做伴娘等于公开处刑！她还说要给我安排5个伴郎相亲！神明救我！',
      category: '姻缘',
      gameType: '接东西',
      options: [
        { text: '让我感冒', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让伴郎都丑', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求老板别再给我画饼',
      description: '说了三年要升我经理，给的"饼"都能开烘焙店了。求神明让他要么兑现，要么闭嘴！',
      category: '职场',
      gameType: '配对',
      options: [
        { text: '直接升职', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '让他给加薪', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求养的金鱼别再用人话骂我',
      description: '神明！我家金鱼今天突然冒出一句"懒"，我以为是幻觉，结果它越骂越多！这是修炼成精了？',
      category: '玄学',
      gameType: '答题',
      options: [
        { text: '让它沉默', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '只让它说鼓励的', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我妈别再让我学开车',
      description: '我已经科目二挂了5次了！她还安排我去其他城市考！求神明让驾校倒闭吧！',
      category: '生活',
      gameType: '跳台阶',
      options: [
        { text: '让我突然开窍', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让妈改变想法', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求一个能听懂我话的朋友',
      description: '我说"今天有点丧"，所有人都让我"加油"。神明，我不要鸡汤，我要一个能陪我喝奶茶的人！',
      category: '生活',
      gameType: '配对',
      options: [
        { text: '送来灵魂朋友', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '让某个老友联系我', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我能看到2030年的自己',
      description: '我突然好想知道5年后我是结婚了、出家了、还是辞职去环游世界了。神明能让我穿越一秒吗？',
      category: '玄学',
      gameType: '点灯',
      options: [
        { text: '送一段未来记忆', description: '消耗神力25', powerCost: 25, effect: 'excellent' },
        { text: '让我做个梦', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我妈别再问我朋友圈里那个男生',
      description: '那是同事的合照，她以为是我男友追问了一周！求神明让她转移注意力！',
      category: '家庭',
      gameType: '接东西',
      options: [
        { text: '让妈追剧上头', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '稍微缓解', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    }
  ],
  random: [
    {
      title: '求小区门口的流浪猫被人收养',
      description: '一只橘猫每天蹲在门口讨饭，眼神特别像我已经去世的爷爷...神明，让它有个家吧！',
      category: '生活',
      gameType: '配对',
      options: [
        { text: '送善心人', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '让它显灵卖萌', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求隔壁装修早日结束',
      description: '已经装修45天了！电钻声24小时不断！求神明让装修队全部突然请假！',
      category: '生活',
      gameType: '接东西',
      options: [
        { text: '集体请假', description: '消耗神力15', powerCost: 15, effect: 'excellent' },
        { text: '降低音量', description: '消耗神力8', powerCost: 8, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我抽奖能中一次',
      description: '已经连续抽了500次都是"谢谢参与"！我开始怀疑后台动了手脚！神明给我开光！',
      category: '运气',
      gameType: '配对',
      options: [
        { text: '直接中大奖', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '中个小奖', description: '消耗神力10', powerCost: 10, effect: 'normal' },
        { text: '忽略', description: '香火-5', powerCost: 0, effect: 'ignore', incensePenalty: 5 }
      ]
    },
    {
      title: '求我对的暗号能被收到',
      description: '神明！我跟天空说"如果你听见我就让今天有彩虹"，今天没彩虹，但有双层云！算不算？求确认！',
      category: '玄学',
      gameType: '答题',
      options: [
        { text: '明天三道彩虹', description: '消耗神力20', powerCost: 20, effect: 'excellent' },
        { text: '只是巧合', description: '消耗神力10', powerCost: 10, effect: 'normal' },
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
// 神一阵鬼一阵 - 完整长帖版（有梗有故事）
export const trickyWishOutcomes = [
  {
    trigger: ['工资', '加薪', '涨工资', '钱'],
    emoji: '🤡',
    title: '求加薪的下场，我服了神仙的字面理解',
    body: `兄弟们，我下班路过寺庙，进去就跟神仙磕了三个头：
"求老板今年给我涨工资500块！"

第二天HR真的把我叫去：
"恭喜你，月薪上调500元。"

我激动得想开香槟。
HR又补了一句：
"另外公司年终奖、餐补、交通补、过节费、健身补贴本月开始全部取消。"

我算了下：**一年倒亏2000**。
我没说话，转身又去庙里加了三炷香。
神仙啊，您字面意思满分啊！`,
    tags: ['#求神注意措辞', '#字面理解警告', '#神仙也会皮']
  },
  {
    trigger: ['孩子', '听话', '懂事', '乖'],
    emoji: '🥲',
    title: '求孩子别再顶嘴，神明的解法吓到我',
    body: `我家娃9岁，每天在家就是个移动的杠精。
我去庙里跟神明说："让我家娃别再顶嘴！"

结果第二天他突发高烧40度，烧得迷迷糊糊。

确实不顶嘴了，连话都说不出来了，只能"妈......水......"

我在医院走廊里哭得稀里哗啦：
**"对不起，我宁愿他骂我。"**

孩子病好之后，第一句话："妈，今天的牛奶你又忘了温！"
我哭着抱住他："你想说什么都行！"`,
    tags: ['#当妈的崩溃', '#神仙的解读', '#含泪笑出声']
  },
  {
    trigger: ['咖啡', '现磨'],
    emoji: '😵‍💫',
    title: '求每天喝现磨咖啡，结果变成全部门的咖啡师',
    body: `我跟神仙说："每天早上想喝杯现磨咖啡。"
本意是希望咖啡机从天而降。

结果同事真送了我一台全自动咖啡机。
**放在了部门茶水间。**

从那天起，每天上班第一件事：
帮全部门12个人轮流做咖啡。
"哥加点糖"
"姐少放奶"
"美式不加冰"

**我自己的咖啡永远是最后一杯，做完时机器都没豆子了。**

神明听见我求"现磨咖啡"，给了我现磨的机会。
只是不是给我喝的。`,
    tags: ['#职场打工人', '#我是奶茶店店员', '#神仙KPI']
  },
  {
    trigger: ['瘦', '减肥', '体重', '120斤'],
    emoji: '🫠',
    title: '求瘦到120斤，神仙：包你能',
    body: `158/138，纠结减肥两年了。
我跟神明说："让我瘦到120斤！多少都行！"

第二天早上吃了一口街边煎饼。
**然后我连续上吐下泻一整周。**

医生说细菌性胃肠炎+食物中毒。
出院称体重：**119.8斤**。

但是镜子里的我：脸色蜡黄、黑眼圈深深、头发掉了1/3。
朋友看到我："你怎么瘦得跟难民似的？"

神明真的给我瘦了。也真的"多少都行"。

现在我每次许愿都加一句："**温和地、健康地**实现可以吗？"`,
    tags: ['#减肥血泪史', '#神仙真听见了', '#许愿要谨慎']
  },
  {
    trigger: ['暗恋', '喜欢', '相处', '在一起'],
    emoji: '😭',
    title: '求和暗恋对象多点相处时间，神仙安排明明白白',
    body: `我们是同部门同事，他是市场总监助理。
我每天暗中观察他三个小时。

我跟神明："让我和他多点相处时间！"

两周后公司组织架构调整：
**他被升为我们组的直属领导。**

第一天开会他就在所有人面前怼我：
"你这方案是初中生写的吧？"

之后他天天找我茬：
"昨天的报表错三个数字！"
"今天的PPT配色辣眼睛！"
"你工位为什么放郁金香？显示你不专业！"

我们确实相处时间变多了。
**多到我每天看到他都想离职。**

爱情滤镜碎了一地。`,
    tags: ['#办公室恋情', '#暗恋的下场', '#滤镜碎一地']
  },
  {
    trigger: ['彩票', '中奖', '财运', '运气'],
    emoji: '🤡',
    title: '求中彩票，神明满足你',
    body: `跟神明说："让我中一次彩票，多少都算！"

第二天打开手机：
**"恭喜您中得双色球5元！"**

我以为是诈骗。结果真的中了5块。

**但是！** 我那张彩票是花了10块钱让饿了么跑腿小哥代买的。

也就是：我赚了5元，倒贴了10元，**实际亏了5元**。
跑腿小哥还在群里发："今天给老板代买，第二次了 [偷笑]"

神仙啊，您是真的够理解"中奖"二字的字面意思了。
下次我说"中奖"，能不能写成"赚钱"？`,
    tags: ['#穷得真实', '#神仙的彩蛋', '#字面意思']
  },
  {
    trigger: ['休息', '周末', '别打扰', '清静'],
    emoji: '👻',
    title: '求周末别被打扰，结果变成失联两天',
    body: `我跟神明说："周末求让我好好休息，别被打扰。"

周五晚下班，我手机**掉进马桶**。

接下来两天：
✅ 没有微信工作群消息
✅ 没有外卖电话
✅ 没有妈妈连环视频
✅ 没有快递短信
✅ 安静到能听见自己心跳

但是：
❌ 也点不了外卖
❌ 也刷不了剧
❌ 也不能扫码进小区
❌ 周日晚上室友以为我死了，敲门差点报警

**两天没人打扰，我快疯了。**
周一上班，我捧着新手机说："神仙啊，我想被打扰。"`,
    tags: ['#社交孤立焦虑', '#没手机=末日', '#神仙字面意思']
  },
  {
    trigger: ['空调', '吹头', '吹风'],
    emoji: '🥵',
    title: '求空调别对着头吹，结果整个房间成蒸笼',
    body: `家里空调出风口正对我脸，吹得天天感冒。
我跟神明："让空调别对着我头吹！"

第二天来了个维修师傅。
"我看了下，您这出风口位置不合适。**我直接把它堵上吧。**"

我："......什么？"

师傅："好嘞，封死了！"

从那天起，整个房间再也不制冷。
**变成了一个20平米的天然桑拿房。**

我现在每天在家穿冰袖、抱冰枕、贴退热贴。
小区里的猫都不肯进我家。

神仙啊，**精准解决问题**这一点没人能教您。`,
    tags: ['#夏天的崩溃', '#过度服务', '#神仙搞笑']
  },
  {
    trigger: ['同事', '闭嘴', '安静', '讨厌'],
    emoji: '🤐',
    title: '求讨厌的同事闭嘴，神明：闭得彻底',
    body: `公司有个Sales叫小杨，每天在工位讲电话像广播员。
我跟神明："求让她闭嘴两周！"

**结果第二天她突发急性喉炎，失声两周。**

我一开始挺开心，工位终于清静了。
但是她那两周的活——

**全部甩给我做。**

她每天微信我："姐救我，这客户你跟一下，我说不了话😭"
"姐这个会议你帮我开一下😭"
"姐我现在去医院，剩下的Excel拜托你🙏"

**两周后她回来时已经康复，我崩溃了。**

我以后再也不敢拿"闭嘴"许愿了。`,
    tags: ['#职场报应', '#愿望反噬', '#神明精准打击']
  },
  {
    trigger: ['陪父母', '回家', '亲情'],
    emoji: '😩',
    title: '求多陪陪父母，神明：包你陪一年',
    body: `我跟神明："想多陪陪爸妈，最好能回老家住一段时间。"

结果第二周，**公司直接裁员。**

我打包行李，带着 N+1 回了老家。
本来想着陪父母三个月就开始找工作。

结果在老家：
- 妈每天嫌我吃饭吧唧嘴
- 爸每天嫌我开空调费电
- 邻居二婶每天来催相亲
- 妈把我的简历挂在小区公告栏

我求"多陪陪父母"，**神明给我安排了6个月超长亲情套餐**。

现在我每天最大的愿望：
**"求让我回到大城市996"。**`,
    tags: ['#裁员的福报', '#被迫尽孝', '#许愿要谨慎']
  }
];

// 连锁事件 - 玄学+跨角色+真情节
export const chainEvents = {
  liMing: {
    success: [
      { ripple: 'liMing爸', text: '李明的爸爸今天来庙里加香了，说儿子终于不让他操心。给小神磕了三个头。', incense: 25, scope: 'self' },
      { ripple: 'liMing妈', text: '李明妈把好消息发到亲戚群，三舅父也跑来上香求保佑。神庙的香炉差点装不下。', incense: 30, scope: 'self' },
      { ripple: 'chenJuan', text: '陈娟在朋友圈给李明点了赞："学弟好棒！"——故事开始有内味儿了。', incense: 15, scope: 'cross', target: 'chenJuan', happinessChange: 5 },
      { ripple: 'wangWu', text: '王五看到李明四六级过了：让我也争口气！来庙里加了把香。', incense: 10, scope: 'cross', target: 'wangWu', happinessChange: 3 },
      { ripple: '玄学', text: '李明真的看到了陌生人头顶的"幸运数字"了！并且认出了一位灵气98的女生——居然是陈娟。', incense: 30, scope: 'cross', target: 'chenJuan', happinessChange: 8, link: 'liMing-chenJuan' },
      { ripple: '玄学', text: '李明的乌龟今天对他说了三个字："多读书。" 李明吓得跪在乌龟面前。', incense: 20, scope: 'self' },
      { ripple: 'liMing前世', text: '李明梦见了战国时代的自己，是个郁郁不得志的术士。醒来后觉得"我至少活得比他自由"。', incense: 18, scope: 'self', happinessChange: 5 }
    ],
    fail: [
      { ripple: 'liMing妈', text: '李明妈打电话："不就过个考试吗"，李明摔了门。', incense: -5, scope: 'self', happinessChange: -5 },
      { ripple: '玄学', text: '李明那只乌龟一直瞪着他不说话，仿佛在嘲笑他。', incense: 0, scope: 'self' }
    ]
  },
  wangWu: {
    success: [
      { ripple: 'wangWu妻', text: '王五的老婆给庙里送了一面锦旗：神明保佑，面馆兴隆。', incense: 30, scope: 'self' },
      { ripple: 'wangWu子', text: '王五给儿子买了新书包，儿子说"长大要做和神仙一样的人"。', incense: 25, scope: 'self' },
      { ripple: 'liMing', text: '李明听说王五创业成功，也想试试副业，来庙里求灵感。', incense: 15, scope: 'cross', target: 'liMing', happinessChange: 5 },
      { ripple: '玄学', text: '王五救的那只小狐狸今天真的开口了，声音清亮："凡人，谢谢你。" 王五跪了一晚。', incense: 35, scope: 'self', happinessChange: 10 },
      { ripple: '玄学', text: '面馆门口出现了一个戴斗笠的奇怪客人，吃完面留下了一块金子。王五觉得这不科学。', incense: 30, scope: 'self' },
      { ripple: 'chenJuan', text: '陈娟和闺蜜来王五面馆打卡，发了小红书。当晚面馆排队到深夜。', incense: 25, scope: 'cross', target: 'chenJuan', happinessChange: 5, link: 'wangWu-chenJuan' }
    ],
    fail: [
      { ripple: 'wangWu', text: '王五在地铁站发呆了一下午，把简历又改了一遍。', incense: 0, scope: 'self' }
    ]
  },
  chenJuan: {
    success: [
      { ripple: 'chenJuan妈', text: '陈娟妈终于停了三天没催婚，全家清静。', incense: 20, scope: 'self' },
      { ripple: 'chenJuan闺蜜', text: '陈娟闺蜜在朋友圈秀她：终于不是单身狗了！', incense: 15, scope: 'self' },
      { ripple: 'liMing', text: '李明在陈娟的朋友圈下评论了一句："姐姐很美。" 两人加了微信。', incense: 22, scope: 'cross', target: 'liMing', happinessChange: 8, link: 'liMing-chenJuan' },
      { ripple: '玄学', text: '陈娟收到了已故外婆的第二封信：信里写的是她从未告诉任何人的童年秘密。陈娟哭了一晚。', incense: 30, scope: 'self', happinessChange: 8 },
      { ripple: '玄学', text: '陈娟养的金鱼今天又用人话说："你今天的发型不错。" 陈娟笑出眼泪。', incense: 20, scope: 'self', happinessChange: 5 },
      { ripple: '玄学', text: '陈娟在2030年的自己跨过时空给她发了条微信："现在的你已经很好了。" 她哭着回复了"谢谢"。', incense: 35, scope: 'self', happinessChange: 12 }
    ],
    fail: [
      { ripple: 'chenJuan', text: '陈娟回家把酒喝光了，第二天还要早起加班。', incense: 0, scope: 'self', happinessChange: -3 }
    ]
  }
};

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
