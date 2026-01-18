import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { database } from '../data'; // 导入数据库

const Industry = () => {
  const [searchParams] = useSearchParams();
  // 支持从导航栏直接跳到某个版块，例如 /industry?tab=agriculture
  const targetId = searchParams.get('tab');

  useEffect(() => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetId]);

  // 通用卡片组件
  const IndustryCard = ({ id, title, subtitle, img, color, items }) => (
    <div id={id} className="group relative h-[500px] overflow-hidden rounded-2xl shadow-lg border border-gray-100">
      {/* 背景图：悬停时放大 */}
      <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={title} />
      
      {/* 渐变遮罩 */}
      <div className={`absolute inset-0 bg-gradient-to-t ${color} to-transparent opacity-90`}></div>
      
      {/* 内容区域 */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
         <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">{subtitle}</p>
             <h2 className="text-4xl font-serif font-bold mb-6">{title}</h2>
             
             {/* 数据列表 */}
             <div className="space-y-4 border-t border-white/20 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {items && items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span className="font-bold text-lg">{item.value}</span>
                    </div>
                ))}
                {!items && <p className="text-sm opacity-70">暂无详细数据，请在 data.js 中配置</p>}
             </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-slate-50 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">绿色产业体系</h1>
            <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
                依托生态治理成果，彰武构建了“一产优、二产强、三产旺”的绿色循环经济体系。
            </p>
        </div>

        {/* 三大产业卡片布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. 精品农业 */}
            <IndustryCard 
                id="agriculture"
                title="精品农业"
                subtitle="PREMIUM AGRICULTURE"
                img="https://images.unsplash.com/photo-1596568603686-22a832620c32?q=80&w=1000" // 建议换成红薯/花生的图
                color="from-green-900 via-green-900/60"
                items={database.industry?.agriculture?.items || [
                    { name: "彰武蜜薯", value: "3000吨" },
                    { name: "有机花生", value: "Top 10" }
                ]}
            />

            {/* 2. 现代工业 (硅砂) */}
            <IndustryCard 
                id="industrial"
                title="硅砂工业"
                subtitle="SILICA SAND INDUSTRY"
                img="https://images.unsplash.com/photo-1516937941348-c09e5548324d?q=80&w=1000" 
                color="from-blue-900 via-blue-900/60"
                items={[
                    { name: "铸造用砂", value: "世界级" },
                    { name: "年产值", value: "50亿+" }
                ]}
            />

            {/* 3. 畜牧养殖 */}
            <IndustryCard 
                id="livestock"
                title="生态畜牧"
                subtitle="ECOLOGICAL LIVESTOCK"
                img="https://images.unsplash.com/photo-1545645672-06b299c85584?q=80&w=1000" 
                color="from-yellow-900 via-yellow-900/60"
                items={[
                    { name: "草原黑牛", value: "5万头" },
                    { name: "阿尔乡羊", value: "有机认证" }
                ]}
            />

        </div>
      </div>
    </div>
  );
};

export default Industry;