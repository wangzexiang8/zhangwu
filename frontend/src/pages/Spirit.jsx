import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, Carousel } from 'antd'; // 引入 Carousel
import { database } from '../data';
import { motion } from 'framer-motion';
import { FlagOutlined, ExperimentOutlined, TeamOutlined, RightOutlined } from '@ant-design/icons';

const Spirit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'history';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // === 数据筛选逻辑 ===
  // 自动把 heroes 分成三组
  const partyHeroes = database.heroes.filter(h => h.category === 'party');
  const scienceHeroes = database.heroes.filter(h => h.category === 'science');
  const publicHeroes = database.heroes.filter(h => h.category === 'public');

  // === 1. 历史脉络 Tab (保持不变) ===
  const HistorySection = () => (
    <div className="py-12 max-w-4xl mx-auto">
      <div className="relative border-l-2 border-green-800/30 ml-4 md:ml-10 space-y-16 pl-8 md:pl-16 py-4">
        
        {/* 节点 1952 */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <span className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-green-800 rounded-full border-4 border-white shadow-sm"></span>
            <span className="text-4xl font-serif font-bold text-slate-200 absolute -top-10 -left-6 z-[-1]">1952</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">设治沙机构，向黄沙宣战</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
                彰武县成立了全省第一个治沙造林机构——彰武县林场。第一代治沙人背着树苗，住进地窝子，面对的是“狂风吹散屋顶，黄沙掩埋农田”的绝境。
            </p>
            <img src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600" className="mt-6 rounded-lg shadow-md w-full md:w-2/3 h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="1952"/>
        </motion.div>

        {/* 节点 1990 */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <span className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-green-600 rounded-full border-4 border-white shadow-sm"></span>
            <span className="text-4xl font-serif font-bold text-slate-200 absolute -top-10 -left-6 z-[-1]">1990</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">攻克技术难关，樟子松引种成功</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
                以董福财为代表的科研人员，突破了流动沙丘造林成活率低的难题。樟子松成功扎根，彰武成为全国著名的“樟子松故乡”。
            </p>
        </motion.div>

        {/* 节点 2025 */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <span className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-yellow-500 rounded-full border-4 border-white shadow-sm"></span>
            <span className="text-4xl font-serif font-bold text-slate-200 absolute -top-10 -left-6 z-[-1]">2025</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">全域旅游，绿水青山就是金山银山</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
                从“以树挡沙”向“以光锁沙”、“以草固沙”的新模式转变。森林覆盖率达到 34.5%，昔日沙海变身今日绿洲，生态旅游蓬勃发展。
            </p>
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600" className="mt-6 rounded-lg shadow-md w-full md:w-2/3 h-64 object-cover" alt="2025"/>
        </motion.div>

      </div>
    </div>
  );

  // === 2. 杰出代表 Tab (全新升级) ===
  
  // 通用人物卡片组件
  const HeroCard = ({ hero, colorClass, icon }) => (
    <div 
      onClick={() => navigate(`/spirit/people/${hero.id}`)}
      className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 flex items-start gap-4"
    >
       {/* 头像 */}
       <div className="w-20 h-20 flex-shrink-0">
          <img src={hero.avatar} className="w-full h-full rounded-full object-cover border-2 border-gray-100 group-hover:border-gray-300 transition-colors" alt={hero.name}/>
       </div>
       
       {/* 信息 */}
       <div className="flex-grow">
         <div className="flex justify-between items-start">
             <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-800 transition-colors">{hero.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${colorClass}`}>{hero.title}</p>
             </div>
             {/* 这里的 Icon 是装饰 */}
             <div className={`opacity-10 group-hover:opacity-100 transition-opacity text-xl ${colorClass}`}>
                {icon}
             </div>
         </div>
         <p className="text-gray-500 text-sm italic line-clamp-2">“{hero.quote}”</p>
         
         <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 group-hover:text-black transition-colors font-medium justify-end">
            查看详情 <RightOutlined className="text-[10px]"/>
         </div>
       </div>
    </div>
  );

  // 分块展示容器
  const SectionContainer = ({ title, sub, icon, color, heroes }) => (
    <div className="mb-16">
       <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
          <div className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center text-xl shadow-md`}>
             {icon}
          </div>
          <div>
             <h2 className="text-2xl font-serif font-bold text-slate-900">{title}</h2>
             <p className="text-xs text-gray-400 uppercase tracking-widest">{sub}</p>
          </div>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.length > 0 ? (
             heroes.map(hero => (
               <HeroCard 
                 key={hero.id} 
                 hero={hero} 
                 colorClass={color.replace('bg-', 'text-')} // 简单的颜色转换技巧
                 icon={icon}
               />
             ))
          ) : (
             <p className="text-gray-400 text-sm col-span-3 py-4">暂无数据...</p>
          )}
       </div>
    </div>
  );

  const PeopleSection = () => (
    <div className="pb-12">
      
      {/* === A. 顶部图片轮播 (Carousel) === */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl relative">
        <Carousel autoplay effect="fade">
          {/* 轮播图 1 */}
          <div className="relative h-[300px] md:h-[400px]">
             <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200" className="w-full h-full object-cover" alt="Slide 1"/>
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                   <h2 className="text-3xl md:text-5xl font-serif font-bold mb-2">英雄群像</h2>
                   <p className="text-lg opacity-90">铭记每一位为这片绿洲奉献青春的人</p>
                </div>
             </div>
          </div>
          {/* 轮播图 2 */}
          <div className="relative h-[300px] md:h-[400px]">
             <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200" className="w-full h-full object-cover" alt="Slide 2"/>
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                   <h2 className="text-3xl md:text-5xl font-serif font-bold mb-2">薪火相传</h2>
                   <p className="text-lg opacity-90">从第一代治沙人到新时代护林员</p>
                </div>
             </div>
          </div>
        </Carousel>
      </div>

      {/* === B. 三大板块分栏展示 === */}
      <div className="max-w-6xl mx-auto">
        
        {/* 1. 党员先锋 (红色系) */}
        <SectionContainer 
           title="党员先锋" 
           sub="The Vanguard" 
           icon={<FlagOutlined />} 
           color="bg-red-600"
           heroes={partyHeroes}
        />

        {/* 2. 科研脊梁 (蓝色系) */}
        <SectionContainer 
           title="科研脊梁" 
           sub="Scientific Backbone" 
           icon={<ExperimentOutlined />} 
           color="bg-blue-600"
           heroes={scienceHeroes}
        />

        {/* 3. 民众力量 (绿色/橙色系) */}
        <SectionContainer 
           title="民众力量" 
           sub="Power of People" 
           icon={<TeamOutlined />} 
           color="bg-orange-500"
           heroes={publicHeroes}
        />

      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-[#Fdfdfd] px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-2">彰武治沙精神</h1>
            <p className="text-gray-400 uppercase tracking-[0.2em] text-xs">A Legacy of Persistence</p>
        </div>

        {/* 标签页切换 */}
        <Tabs 
          activeKey={activeTab} 
          onChange={(key) => setActiveTab(key)}
          centered 
          size="large"
          items={[
            { key: 'history', label: '历史脉络', children: <HistorySection /> },
            { key: 'people', label: '杰出代表', children: <PeopleSection /> },
          ]}
        />
      </div>
    </div>
  );
};

export default Spirit;