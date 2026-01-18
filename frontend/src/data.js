// src/data.js
// 这个文件是全站的“内容仓库”，以后修改文字直接来这里找

export const database = {
    // === 1. 治沙英雄数据 (Spirit板块) ===
    heroes: [
      // --- 党员先锋 ---
      {
        id: "liubin",
        category: "party", // 新增字段：party=党员, science=科研, public=民众
        name: "刘斌",
        title: "第一任治沙局长",
        tags: ["党员先锋", "拓荒者"],
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400", 
        quote: "如果不把沙治住，就让沙把我们埋掉。",
        content: "<p>这里是刘斌的详细事迹...</p>"
      },
      {
        id: "wangzhan",
        category: "party",
        name: "王战", // 虚构示例
        title: "治沙突击队队长",
        tags: ["党旗飘扬", "冲锋在前"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
        quote: "哪里最苦，哪里就有共产党员。",
        content: "<p>详细事迹...</p>"
      },
  
      // --- 科研脊梁 ---
      {
        id: "dongfucai",
        category: "science",
        name: "董福财",
        title: "林业专家 / 治沙愚公",
        tags: ["科研攻坚", "樟子松之父"],
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
        quote: "一生只做一件事，把论文写在大地上。",
        content: "<p>详细事迹...</p>"
      },
      {
        id: "liscientist",
        category: "science",
        name: "李教授", // 虚构示例
        title: "土壤改良专家",
        tags: ["科技兴林", "创新"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
        quote: "用科学战胜风沙。",
        content: "<p>详细事迹...</p>"
      },
  
      // --- 民众力量 ---
      {
        id: "houguimin",
        category: "public",
        name: "侯贵敏",
        title: "治沙女杰",
        tags: ["巾帼英雄", "坚守"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
        quote: "为了子孙后代，这树必须种活。",
        content: "<p>详细事迹...</p>"
      },
      {
        id: "zhangsan",
        category: "public",
        name: "老张头", // 虚构示例
        title: "护林员",
        tags: ["默默奉献", "守护"],
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400",
        quote: "看着树长大，就像看着孩子长大。",
        content: "<p>详细事迹...</p>"
      },
    ],
  
    // === 2. 产业数据 (Industry板块) ===
    industry: {
      agriculture: {
        title: "精品农业",
        desc: "依托独特的沙地土壤，打造高品质农产品。",
        items: [
          { name: "沙地蜜薯", value: "3000吨", feature: "口感软糯，含糖量高" },
          { name: "有机花生", value: "500万产值", feature: "颗粒饱满，出油率高" }
        ]
      },
      // ... 可以继续补充工业和畜牧业
    },
  
    // === 3. 团队信息 (About板块) ===
    team: {
      slogan: "以数字技术赋能乡村振兴",
      members: [
        { name: "张三", role: "队长 / 统筹", word: "脚踏实地，仰望星空。" },
        { name: "李四", role: "前端开发", word: "代码改变世界。" },
      ]
    },
  tours: [
      { 
        id: "zhanggutai", 
        name: "章古台林场", 
        x: 68, y: 25, // 坐标还是需要的，画地图用
        type: "林海", 
        img: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800", 
        desc: "万亩松林核心区，治沙精神发源地",
        // 下面是详情页专用的长内容
        intro: "这里是彰武治沙的起点，拥有亚洲最大的人工樟子松林。置身其中，听松涛阵阵，感悟一代代治沙人与天斗、与地斗的英雄气概。",
        features: ["万亩松林", "瞭望塔", "治沙纪念馆"],
        itinerary: [
          { time: "09:00", activity: "抵达林场，参观治沙精神纪念馆" },
          { time: "10:30", activity: "徒步松林栈道，登瞭望塔俯瞰绿洲" },
          { time: "12:00", activity: "品尝林场特色农家饭" }
        ]
      },
      { 
        id: "daleng", 
        name: "大冷乡", 
        x: 42, y: 35, 
        type: "草原", 
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800", 
        desc: "漠上草原风景区，体验独特沙地风情",
        intro: "大冷乡拥有独特的沙地草原地貌，牛羊成群，风吹草低。这里不仅能看到从前的沙地遗迹，更能看到生态恢复后的勃勃生机。",
        features: ["草原骑马", "蒙古包体验", "篝火晚会"],
        itinerary: [
          { time: "14:00", activity: "草原漫步，体验骑马射箭" },
          { time: "16:00", activity: "走访牧民家庭，了解生态养殖" },
          { time: "19:00", activity: "参加草原篝火晚会" }
        ]
      },
      { 
        id: "zhangwutown", 
        name: "彰武镇", 
        x: 55, y: 70, 
        type: "人文", 
        img: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800", 
        desc: "县政府所在地，历史与现代交融",
        intro: "作为全县的政治经济中心，彰武镇见证了这座城市的变迁。这里有热闹的市集、完善的设施，是研学旅行的最佳中转站。",
        features: ["城市漫步", "特色美食", "历史建筑"],
        itinerary: [
          { time: "全天", activity: "游览县城，品尝彰武地瓜、烘糕等特产" }
        ]
      },
      { 
        id: "liuhe", 
        name: "柳河湿地", 
        x: 30, y: 55, 
        type: "湿地", 
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", 
        desc: "候鸟迁徙停歇地，生态摄影天堂",
        intro: "柳河蜿蜒流淌，形成了大片的湿地生态系统。每年春秋两季，成千上万的候鸟在此停歇，是摄影爱好者和自然观察者的天堂。",
        features: ["观鸟拍摄", "湿地科普", "日落景观"],
        itinerary: [
          { time: "16:00", activity: "抵达湿地公园，进行鸟类观察" },
          { time: "17:30", activity: "拍摄柳河日落壮美景色" }
        ]
      },
    ]
  };