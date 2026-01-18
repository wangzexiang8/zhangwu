import React from 'react';
import { database } from '../data'; // 导入数据库
import { UserOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';

const About = () => {
  // 如果 database.team 还没数据，用默认数据兜底，防止报错
  const teamInfo = database.team || {
    slogan: "以数字技术赋能乡村振兴",
    members: [
      { name: "队长", role: "统筹规划", word: "脚踏实地" },
      { name: "技术", role: "全栈开发", word: "代码改变世界" },
      { name: "设计", role: "UI/UX", word: "追求极致体验" },
    ]
  };

  return (
    <div className="pt-24 min-h-screen bg-white pb-20">
      
      {/* 头部 Slogan */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center">
         <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-6 text-2xl">
            <TeamOutlined />
         </div>
         <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">瀚海筑梦 · 守绿传薪</h1>
         <p className="text-slate-400 max-w-xl mx-auto text-lg tracking-wide">
           {teamInfo.slogan}
         </p>
         <p className="mt-4 text-sm text-slate-500 uppercase tracking-widest">Dalian University of Technology</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10">
         
         {/* 项目简介卡片 */}
         <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <TrophyOutlined className="text-yellow-500"/> 项目背景
            </h2>
            <p className="text-gray-600 leading-loose">
               本项目由大连理工大学盘锦校区社会实践团队发起。我们深入辽宁彰武，通过实地调研、人物访谈与资料收集，利用现代 Web 技术构建了这个数字展示平台。
               旨在向世界展示彰武治沙七十载的辉煌历程，让“大漠孤烟”变“绿洲新生”的奇迹被更多人看见。
            </p>
         </div>

         {/* 团队成员 Grid */}
         <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">团队成员</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamInfo.members.map((member, index) => (
               <div key={index} className="bg-slate-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group text-center">
                  <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden">
                     {/* 如果有头像就显示头像，没有就显示图标 */}
                     {member.avatar ? (
                        <img src={member.avatar} className="w-full h-full object-cover" alt={member.name}/>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl"><UserOutlined /></div>
                     )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <div className="text-xs text-green-600 font-bold uppercase mt-1 mb-3">{member.role}</div>
                  <p className="text-sm text-gray-500 italic">“{member.word}”</p>
               </div>
            ))}
         </div>

      </div>
    </div>
  );
};

export default About;