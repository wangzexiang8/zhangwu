import React, { useState } from 'react';
import { database } from '../data';
import { motion } from 'framer-motion';
import { UserOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';

const About = () => {
  const { team } = database;
  // 手风琴状态：默认选中第一个人 (id: 1)
  const [activeMember, setActiveMember] = useState(1);

  // 兜底防止数据为空
  if (!team) return <div>Loading...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* === Section 1: 团队旗帜与介绍 (Hero) === */}
      <div className="relative pt-32 pb-20 px-6 bg-slate-900 overflow-hidden">
        {/* 背景装饰：深色底纹 */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
           
           {/* 左侧：旗帜展示 (做成飘动的效果或者挂在墙上的感觉) */}
           <motion.div 
             initial={{ x: -50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ duration: 1 }}
             className="w-full md:w-1/2 flex justify-center"
           >
              <div className="relative group">
                  {/* 旗帜图片容器 */}
                  <div className="w-[300px] h-[200px] md:w-[500px] md:h-[333px] bg-white rounded shadow-2xl overflow-hidden relative border-4 border-yellow-600/30 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                      {/* 这里放你们真实的旗帜图片，暂时用 Logo 代替 */}
                      <img src="/team-flang.jpg" className="w-full h-full object-cover" alt="Team Flag" />
                      
                      {/* 旗帜上的光泽感 */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
                  </div>
                  {/* 阴影 */}
                  <div className="absolute -bottom-10 left-10 right-10 h-4 bg-black/50 blur-xl rounded-full transform rotate-[-2deg]"></div>
              </div>
           </motion.div>

           {/* 右侧：文案介绍 */}
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="w-full md:w-1/2 text-white"
           >
              <div className="flex items-center gap-3 mb-6">
                 <span className="w-12 h-1 bg-green-500"></span>
                 <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">瀚海筑梦 · 守绿传薪</h1>
              </div>
              
              <h2 className="text-xl font-bold text-green-400 mb-6">{team.intro.title}</h2>
              
              <p className="text-slate-300 leading-loose text-justify text-lg">
                 {team.intro.content}
              </p>
              
              <div className="mt-8 flex gap-4 text-sm text-slate-500 font-mono">
                 <span>EST. 2024</span>
                 <span>|</span>
                 <span>DLUT PANJIN CAMPUS</span>
              </div>
           </motion.div>
        </div>
      </div>

      {/* === Section 2: 成员介绍 (手风琴特效) === */}
      <div className="py-24 bg-slate-50 overflow-hidden">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">核心成员</h2>
            <p className="text-gray-400 uppercase tracking-widest text-xs">Our Brilliant Team</p>
         </div>

         {/* 手风琴容器 */}
         <div className="max-w-[1400px] mx-auto h-[500px] px-4 flex gap-2 md:gap-4">
            {team.members.map((member) => (
               <motion.div
                 key={member.id}
                 layout // 开启布局动画
                 onClick={() => setActiveMember(member.id)}
                 className={`relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-lg ${
                    activeMember === member.id ? 'flex-[10]' : 'flex-[1]'
                 }`}
               >
                  {/* 背景图 */}
                  <img src={member.img} className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={member.name} />
                  
                  {/* 遮罩 (未选中时变暗) */}
                  <div className={`absolute inset-0 bg-black/40 transition-opacity ${activeMember === member.id ? 'opacity-0' : 'opacity-60 hover:opacity-20'}`}></div>

                  {/* 文字内容 */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/90 to-transparent">
                     {/* 只有选中时显示详细描述 */}
                     {activeMember === member.id ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                           <h3 className="text-3xl font-bold mb-1">{member.name}</h3>
                           <p className="text-green-400 font-bold uppercase text-sm mb-2">{member.role}</p>
                           <p className="text-gray-300 italic">“{member.desc}”</p>
                        </motion.div>
                     ) : (
                        // 未选中时，只显示竖排的名字 (在很窄的时候) 或者 简写
                        <div className="text-center">
                           <p className="text-lg font-bold rotate-0 md:hidden">{member.name.charAt(0)}</p> {/* 手机版只显示姓 */}
                           <p className="hidden md:block text-xl font-bold writing-mode-vertical">{member.name}</p>
                        </div>
                     )}
                  </div>
               </motion.div>
            ))}
         </div>
      </div>

      {/* === Section 3: 过往活动 (交错布局) === */}
      <div className="py-24 max-w-5xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">筑梦足迹</h2>
            <p className="text-gray-400 uppercase tracking-widest text-xs">Past Activities</p>
         </div>

         <div className="space-y-12">
            {team.activities.map((item, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.2 }}
                 className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
               >
                  {/* 图片部分 */}
                  <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl group">
                     <img src={item.img} className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  </div>

                  {/* 文字部分 */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                     <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 font-bold mb-2">
                        <ClockCircleOutlined /> <span>{item.date}</span>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed text-lg">
                        {item.desc}
                     </p>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* 底部结语 */}
         <div className="mt-24 text-center p-10 bg-green-50 rounded-3xl border border-green-100">
            <TeamOutlined className="text-4xl text-green-600 mb-4"/>
            <p className="text-xl font-serif text-green-900">
               “我们的故事才刚刚开始，欢迎加入我们，续写绿色篇章。”
            </p>
         </div>
      </div>

    </div>
  );
};

export default About;