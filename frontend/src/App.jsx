import React, { useState, useEffect } from 'react';
import { Button, Tag, Modal, Form, Input, message } from 'antd';
import { PlayCircleOutlined, UserOutlined, CaretRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ImageComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl select-none"
    >
      {/* 1. 底图 */}
      <img 
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover" 
        alt="After" 
      />
      <div className="absolute top-4 right-4 bg-green-800/90 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md z-10 font-serif tracking-widest border border-white/20">
        2025 · 绿洲彰武
      </div>

      {/* 2. 顶图  */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2832&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90" // 增加旧照片质感
          alt="Before" 
        />
        <div className="absolute top-4 left-4 bg-yellow-700/90 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md font-serif tracking-widest border border-white/20">
          1950 · 沙海肆虐
        </div>
      </div>

      {/* 3. 分割线 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-800">
           <div className="flex gap-0.5"><CaretRightOutlined rotate={180} style={{fontSize: 10}}/><CaretRightOutlined style={{fontSize: 10}}/></div>
        </div>
      </div>

      {/* 4. 透明的  */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0" 
        style={{appearance: 'none'}} 
      />
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const InteractiveMap = () => {
  // 这里定义地图上的点位数据
  // x: 左边距百分比, y: 上边距百分比 (你需要根据实际地图微调这些数值)
  const spots = [
    {
      id: 1,
      name: "章古台镇",
      x: 65, // 距离左边 65%
      y: 20, // 距离顶部 20%
      desc: "万亩松林核心区，治沙精神的发源地。",
      img: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=300&auto=format&fit=crop", // 换成你的景点图
      link: "/detail/zhanggutai" // 点击跳转的链接
    },
    {
      id: 2,
      name: "彰武镇",
      x: 55,
      y: 75,
      desc: "县政府所在地，历史与现代交融。",
      img: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=300&auto=format&fit=crop",
      link: "/detail/zhangwuzhen"
    },
    {
      id: 3,
      name: "大冷乡",
      x: 40,
      y: 30,
      desc: "漠上草原风景区，体验独特沙地风情。",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=300&auto=format&fit=crop",
      link: "/detail/daleng"
    },
    {
      id: 4,
      name: "哈尔套镇",
      x: 20,
      y: 50,
      desc: "特色农业示范区，有机农产品基地。",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=300&auto=format&fit=crop",
      link: "/detail/haertao"
    },
  ];

  const handleSpotClick = (link) => {
    // 这里实现跳转，如果是单页应用可以用 navigate，这里先用 window.open 演示
    alert(`即将跳转到详情页: ${link}`); 

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* 1. 地图底图 */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#fffcf5] border-4 border-white">
          <img 
            src="/zhangwu-map.png" 
            alt="彰武全域旅游地图" 
            className="w-full h-auto object-contain mix-blend-multiply opacity-90" // mix-blend-multiply 让地图白底变透明
          />
          
          {/* 装饰：加一个纸质纹理感 */}
          <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none"></div>
      </div>

      {/* 2. 遍历生成红点 (Pins) */}
      {spots.map((spot) => (
        <div
          key={spot.id}
          className="absolute w-6 h-6 group cursor-pointer"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }} // 定位核心
          onClick={() => handleSpotClick(spot.link)}
        >
          {/* 红色呼吸点 */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 border-2 border-white shadow-md items-center justify-center">
            {/* 中心小白点 */}
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>

          {/* 地名标签  */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-slate-800 bg-white/80 px-2 py-0.5 rounded shadow-sm backdrop-blur-sm border border-slate-200">
             {spot.name}
          </div>

          {/* 悬停显示的卡片  */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 bg-white rounded-lg shadow-xl p-2 hidden group-hover:block z-50 transition-all duration-300 transform origin-bottom border border-gray-100">
             {/* 小三角 */}
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-100"></div>
             
             <div className="relative z-10">
                <img src={spot.img} alt={spot.name} className="w-full h-24 object-cover rounded-md mb-2" />
                <h4 className="font-bold text-slate-800 text-sm mb-1">{spot.name}</h4>
                <p className="text-xs text-slate-500 leading-snug text-left">
                    {spot.desc}
                </p>
                <div className="mt-2 text-xs text-blue-600 font-medium text-right">点击查看详情 &rarr;</div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setLoading(false), 2000);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#Fdfdfd] font-sans selection:bg-blue-200">
      
      {/* === 开场动画 === */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-[#001529] flex items-center justify-center text-white"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h1 className="text-6xl md:text-9xl font-serif italic tracking-widest mb-8 font-black">
            彰武</h1>
              <div className="w-16 h-[1px] bg-white/30 mx-auto overflow-hidden">
                <motion.div className="w-full h-full bg-white" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5 }} />
              </div>
              <p className="mt-4 text-xs tracking-[0.3em] opacity-70">中国 · 辽宁</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 导航栏 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-3 shadow-sm text-slate-800' : 'bg-transparent py-8 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif font-bold text-2xl tracking-widest flex items-center gap-2 uppercase">
           彰武
          </div>
          <div className={`hidden md:flex gap-12 text-sm font-medium tracking-wide ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>
            <a href="#spirit" className="hover:text-blue-500 transition-colors">治沙精神</a>
            <a href="#industry" className="hover:text-blue-500 transition-colors">绿色产业</a>
            <a href="#scenery" className="hover:text-blue-500 transition-colors">全域旅游</a>
          </div>
          <Button 
            type={isScrolled ? "default" : "primary"} 
            ghost={!isScrolled}
            icon={<UserOutlined />}
            onClick={() => setIsModalOpen(true)}
            className={!isScrolled ? "border-white/50 text-white hover:border-white hover:text-white" : ""}
          >
            管理登录
          </Button>
        </div>
      </nav>

      {/* Hero 区域 */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <motion.div 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 10, ease: "linear" }}
           className="absolute inset-0"
        >
            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="background"/>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#Fdfdfd]"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
            <FadeIn delay={2.2}>
            <p className="text-blue-200 tracking-[0.8em] md:tracking-[1.2em] text-xs md:text-sm uppercase mb-8 font-medium border-b border-blue-500/30 pb-4 inline-block">中国 · 辽宁 · 彰武</p>
            </FadeIn>
            
            <div className="overflow-hidden py-2">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.3, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-lg"
              >
                瀚海筑梦 <br/> <span className="italic font-light opacity-90">守绿传薪</span>
              </motion.h1>
            </div>

            <FadeIn delay={2.5}>
              <p className="text-lg text-gray-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
                 看见彰武，看见中国治沙的力量。七十载岁月，彰武人以精神为种，以汗水浇灌，将昔日的不毛之地，变为了今日的生态屏障。
              </p>
              <div className="flex justify-center gap-6">
                 <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">探索故事</button>
                 <button className="px-8 py-3 text-white border border-white/30 rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center gap-2"><PlayCircleOutlined /> 宣传大片</button>
              </div>
            </FadeIn>
        </div>
      </header>

     {/* 治沙精神 (新版：包含历史宏观 + 人物微观) */}
     <section id="spirit" className="py-32 bg-[#Fdfdfd] relative">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* === 第一部分：历史宏观 === */}
            <FadeIn>
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <span className="text-yellow-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">1950 - 2025</span>
                    <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">
                        从黄沙漫天 <br/> 到 <span className="italic text-green-800">林海茫茫</span>
                    </h2>
                    <p className="text-gray-500 text-lg leading-loose font-light max-w-2xl mx-auto">
                        如何让风停下？七十年来，彰武人用树木给出了答案。
                        <br/>
                        这里曾是“狂风吹散屋顶，黄沙掩埋农田”的科尔沁沙地南缘。如今，一代代治沙人创造了绿色的奇迹，改写了辽宁的生态版图。
                    </p>
                    
                    {/* 数据展示 */}
                    <div className="flex justify-center gap-12 md:gap-24 border-t border-gray-100 pt-8 mt-8">
                        <div>
                            <div className="text-4xl md:text-5xl font-serif text-slate-900">34.5%</div>
                            <div className="text-xs text-gray-400 mt-2 tracking-widest uppercase">森林覆盖率</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-serif text-slate-900">600万+</div>
                            <div className="text-xs text-gray-400 mt-2 tracking-widest uppercase">固沙造林 (亩)</div>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* 历史对比图 (居中) */}
            <div className="max-w-6xl mx-auto mb-32">
                <ImageComparison />
            </div>

            {/* === 第二部分：人物群像 (新加的“荣誉墙”) === */}
            <FadeIn delay={0.2}>
                <div className="border-t border-gray-200 pt-20">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-serif text-slate-900 mb-4">治沙英雄谱</h3>
                        <p className="text-gray-500 text-sm tracking-widest uppercase">The Guardians of Zhangwu</p>
                    </div>

                    {/* 三列布局：党员 / 科研 / 百姓 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        
                        {/* 1. 党员先锋 */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                                <span className="w-2 h-8 bg-red-700 rounded-full"></span>
                                <h4 className="font-bold text-xl text-slate-800">党员先锋</h4>
                            </div>
                            
                            {/* 人物 1: 小K */}
                            <div className="flex gap-4 mb-6 group">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="刘斌"/>
                                <div>
                                    <div className="font-serif font-bold text-lg text-slate-900">刘斌</div>
                                    <div className="text-xs text-red-600 font-bold uppercase mb-1">第一任治沙局长</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">如果不把沙治住，就让沙把我们埋掉。</p>
                                </div>
                            </div>
                            {/* 人物 2: 小C */}
                            <div className="flex gap-4 group">
                                {/* TODO: 记得换小C的照片 */}
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs grayscale group-hover:grayscale-0 transition-all">照片</div>
                                <div>
                                    <div className="font-serif font-bold text-lg text-slate-900">小C</div>
                                    <div className="text-xs text-red-600 font-bold uppercase mb-1">基层干部</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">扎根一线，带领群众科学治沙。</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. 科研攻坚 */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                                <span className="w-2 h-8 bg-blue-700 rounded-full"></span>
                                <h4 className="font-bold text-xl text-slate-800">科研脊梁</h4>
                            </div>

                            {/* 人物 1: 小P */}
                            <div className="flex gap-4 mb-6 group">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="董福财"/>
                                <div>
                                    <div className="font-serif font-bold text-lg text-slate-900">董福财</div>
                                    <div className="text-xs text-blue-600 font-bold uppercase mb-1">林业专家</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">一生只做一件事，把论文写在大地上。</p>
                                </div>
                            </div>
                            {/* 人物 2: 小B */}
                            <div className="flex gap-4 group">
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs">照片</div>
                                <div>
                                    <div className="font-serif font-bold text-lg text-slate-900">小B</div>
                                    <div className="text-xs text-blue-600 font-bold uppercase mb-1">技术员</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">创新固沙技术，攻克流动沙丘难题。</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. 百姓力量 */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                                <span className="w-2 h-8 bg-green-700 rounded-full"></span>
                                <h4 className="font-bold text-xl text-slate-800">民间力量</h4>
                            </div>

                            {/* 人物 1: 小W */}
                            <div className="flex gap-4 mb-6 group">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="李东魁"/>
                                <div>
                                    <div className="font-serif font-bold text-lg text-slate-900">李东魁</div>
                                    <div className="text-xs text-green-600 font-bold uppercase mb-1">治沙劳模</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">从一家一户治沙，到带动全村致富。</p>
                                </div>
                            </div>
                            {/* 人物 2: 小A */}
                            <div className="flex gap-4 group">
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs">照片</div>
                                <div>
                                    <div className="font-serif font-bold text-lg text-slate-900">小A</div>
                                    <div className="text-xs text-green-600 font-bold uppercase mb-1">护林员</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">三十年如一日，守护这片来之不易的绿。</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </FadeIn>
            
        </div>
      </section>
      
      {/* 产业板块  */}
      <section id="industry" className="py-32 bg-[#111] text-white">
        <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
                  <div>
                    <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">Premium Industry</span>
                    <h2 className="text-5xl font-serif mt-4">点沙成金 · 产业奇迹</h2>
                  </div>
                  <p className="text-gray-400 max-w-sm text-right hidden md:block">精准农业与现代工业的完美协奏。</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. 枸杞 */}
                <FadeIn delay={0.2}>
                  <div className="md:col-span-2 h-[500px] bg-[#1a1a1a] rounded-none relative overflow-hidden group border border-white/5">
                      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
                          <div>
                            <Tag className="bg-red-900/40 text-red-200 border-none px-3 py-1 text-xs tracking-wider">农业王牌</Tag>
                            <h3 className="text-4xl font-serif mt-4 mb-2">彰武沙地枸杞</h3>
                          </div>
                          <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                             <p className="text-gray-300 mb-6 max-w-md">得益于独特的沙地土壤与大温差，其多糖含量高出国家平均水平 15% 以上。</p>
                             <span className="text-white border-b border-white pb-1 cursor-pointer text-sm tracking-wide">阅读调研报告 →</span>
                          </div>
                      </div>
                      <img src="https://so1.360tres.com/t011e86626eb063d83d.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt="goji"/>
                  </div>
                </FadeIn>

                {/* 2. 硅砂 */}
                <FadeIn delay={0.4}>
                  <div className="h-[500px] bg-[#1a1a1a] relative overflow-hidden group border border-white/5">
                      <div className="absolute inset-0 z-10 p-10">
                          <h3 className="text-3xl font-serif text-white">世界级硅砂</h3>
                          <p className="text-gray-400 mt-2 text-sm tracking-wider">Industrial Grade Purity</p>
                      </div>
                      <img src="http://5b0988e595225.cdn.sohucs.com/images/20170923/0b70bbf9b8e44cac9eba35664dcf61eb.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="sand"/>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </FadeIn>
            </div>
        </div>
      </section>
{/* 6. 全域旅游  */}
      <section id="scenery" className="py-24 bg-[#fffcf5]">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">全域旅游 · 研学导览</h2>
                <p className="text-gray-500 mb-12 max-w-2xl mx-auto">点击地图上的红色标记，探索彰武的自然风光与红色足迹。<br/>从漠上草原到万亩松林，每一步都是风景。</p>
            </FadeIn>
            <FadeIn delay={0.2}>
                <InteractiveMap />
            </FadeIn>
        </div>
      </section>
{/* 页脚 (已添加大工Logo和官方落款) */}
      <footer className="bg-white text-slate-900 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
            
            {/* 第一列：Logo + 学校信息 (核心修改区域) */}
            <div className="col-span-2">
                <div className="flex items-start gap-5 mb-6">
                    {/* 队旗/Logo：加了白色边框和阴影，显得很立体 */}
                    <img 
                        src="/team-logo.jpg" 
                        alt="Team Logo" 
                        className="w-16 h-16 rounded-full border-4 border-gray-50 shadow-md object-cover" 
                    />
                    <div className="mt-1">
                        <div className="font-serif text-2xl font-bold text-slate-900 tracking-wide">大连理工大学</div>
                        <div className="text-xs text-blue-600 font-bold uppercase tracking-[0.15em] mt-1">
                            瀚海筑梦 · 守绿传薪实践团
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 max-w-sm leading-relaxed text-sm pl-1">
                    以数字技术赋能乡村振兴，记录彰武治沙七十载的绿色奇迹。
                    <br/><br/>
                    <span className="opacity-70">本平台由大连理工大学盘锦校区社会实践团队开发与维护。</span>
                </p>
            </div>

            {/* 第二列：导航 */}
            <div>
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-900">网站导航</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                    <li><a href="#spirit" className="hover:text-blue-600 transition-colors">治沙历史</a></li>
                    <li><a href="#industry" className="hover:text-blue-600 transition-colors">特色产业</a></li>
                    <li><a href="#scenery" className="hover:text-blue-600 transition-colors">全域旅游</a></li>
                </ul>
            </div>

            {/* 第三列：联系 */}
            <div>
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-900">联系我们</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                    <li><a href="#" className="hover:text-blue-600 transition-colors">官方微信</a></li>
                    <li><a href="#" className="hover:text-blue-600 transition-colors">合作邮箱</a></li>
                </ul>
            </div>
        </div>

        {/* 底部版权栏 */}
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
            <span>© 2025 DUT Practice Team. All Rights Reserved.</span>
            <span className="opacity-60">仅用于学术与公益展示 · 非商业用途</span>
        </div>
      </footer>
      
      {/* 登录框 */}
      <Modal title="后台管理系统" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} centered>
        <Form layout="vertical" className="pt-4">
            <Form.Item name="username" label="管理员账号"><Input size="large" prefix={<UserOutlined />} /></Form.Item>
            <Form.Item name="password" label="密码"><Input.Password size="large" /></Form.Item>
            <Button type="primary" block size="large" className="bg-black hover:bg-gray-800 border-none h-12">安全登录</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default App;