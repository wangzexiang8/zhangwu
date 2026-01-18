import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReloadOutlined, RadarChartOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

const SilicaIndustry = ({ companies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setIsFlipped(false);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-full p-4 md:p-0 overflow-hidden relative">
      
      {/* === 背景装饰：极简的光晕 === */}
      {/* 左下角蓝色微光 */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      {/* 右上角白色微光 */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 大数字水印 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
          <h1 className="text-[20rem] font-black text-white/[0.03] font-sans leading-none tracking-tighter mix-blend-overlay">
            {activeIndex + 1}
          </h1>
      </div>

      {/* === 左侧：弧形滚轮 (Arc Wheel) === */}
      <div className="w-[30%] h-full relative flex items-center z-10">
        
        {/* 弧线：带发光效果的柔和线条 */}
        <div className="absolute -left-[600px] top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-r border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"></div>
        
        <div className="relative w-full h-full flex flex-col justify-center">
          {companies.map((company, index) => {
            const offset = index - activeIndex;
            if (Math.abs(offset) > 4) return null;

            const isActive = offset === 0;
            const y = offset * 90; 
            const x = 200 - Math.pow(Math.abs(offset), 1.8) * 30; 
            const rotate = offset * 8; 
            const scale = isActive ? 1.25 : 1 - Math.abs(offset) * 0.1;
            const opacity = isActive ? 1 : 0.4; // 提高未选中状态的透明度，让人能看清
            
            return (
              <motion.div
                key={company.id}
                className="absolute left-0 flex items-center gap-6 cursor-pointer origin-left"
                initial={false}
                animate={{ x, y, scale, opacity, rotate }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                style={{ top: '50%', marginTop: '-24px' }}
                onClick={() => handleSelect(index)}
              >
                {/* 连接点：圆润的光点 */}
                <div className={`w-3 h-3 rounded-full transition-all duration-500 shadow-lg ${isActive ? 'bg-white shadow-white/50 scale-125' : 'bg-slate-600 border border-slate-500'}`}></div>
                
                {/* 连线 */}
                <div className={`h-[1px] w-12 transition-colors ${isActive ? 'bg-gradient-to-r from-white to-transparent' : 'bg-slate-700'}`}></div>

                {/* 公司名称：渐变文字 */}
                <div className={`flex items-center transition-all duration-500`}>
                    <span className={`font-bold text-xl tracking-wider font-sans uppercase transition-all ${
                        isActive 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-md' 
                        : 'text-slate-500'
                    }`}>
                        {company.name}
                    </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === 右侧：圆角渐变卡片 === */}
      <div className="w-[65%] h-full flex items-center justify-center pr-10 md:pr-20 perspective-2000 z-20">
        <motion.div
          className="w-full max-w-6xl aspect-[16/9] relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* --- 正面 (Front) --- */}
          {/* 圆角 rounded-[2.5rem] + 边框渐变 + 背景深色渐变 */}
          <div className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-white/10 shadow-2xl backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <div className="w-full h-full rounded-[2.4rem] bg-gradient-to-br from-slate-900/90 to-black/95 backdrop-blur-xl overflow-hidden flex flex-col relative">
                
                {/* 顶部通栏：更加通透 */}
                <div className="h-[32%] px-12 flex items-center justify-between border-b border-white/5 relative bg-white/[0.02]">
                    <div className="flex items-center gap-8">
                        {/* Logo 容器：圆角浮起 */}
                        <div className="w-20 h-20 bg-gradient-to-b from-white to-slate-200 rounded-2xl p-1 shadow-lg shadow-white/10">
                            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                                <img src={companies[activeIndex].logo} className="w-12 h-12 object-contain" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">{companies[activeIndex].name}</h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                {companies[activeIndex].front.tag}
                            </span>
                        </div>
                    </div>
                    {/* 装饰图标 */}
                    <DeploymentUnitOutlined className="text-7xl text-white/5 rotate-12" />
                </div>

                {/* 内容区：更明亮的文字 */}
                <div className="flex-grow p-12 flex flex-col justify-between">
                    <div>
                       <div className="flex items-center gap-2 mb-6 opacity-60">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <h3 className="text-blue-200 uppercase tracking-widest text-xs font-bold">Profile Overview</h3>
                       </div>
                       <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-200">
                         {companies[activeIndex].front.desc}
                       </p>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-white/10 pt-8 mt-4">
                        <div className="flex gap-6 text-xs text-slate-400 font-mono">
                           <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> ACTIVE</span>
                           <span>ID: {activeIndex + 2049}</span>
                        </div>
                        
                        <div className="group flex items-center gap-3 text-white cursor-pointer">
                           <span className="text-xs font-bold tracking-[0.2em] group-hover:text-blue-300 transition-colors">TAP TO FLIP</span>
                           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-[0_0_15px_#2563eb] transition-all duration-300">
                              <ReloadOutlined />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* --- 背面 (Back) --- */}
          <div 
             className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-blue-500/30 via-slate-800 to-slate-900 shadow-2xl backface-hidden"
             style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
             <div className="w-full h-full rounded-[2.4rem] bg-[#080b14] relative overflow-hidden flex flex-col">
                 
                 {/* 顶部 */}
                 <div className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-gradient-to-r from-blue-900/20 to-transparent">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                       <RadarChartOutlined className="text-blue-400"/> TECHNICAL DATA
                    </h3>
                    <div className="flex gap-1">
                       <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                    </div>
                 </div>

                 {/* 数据区 - 使用更柔和的深色卡片 */}
                 <div className="flex-grow grid grid-cols-2 p-6 gap-6">
                    {/* 左侧：核心产品 */}
                    <div className="bg-white/[0.03] rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:bg-white/[0.05] transition-colors border border-white/5">
                       <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                       <span className="text-xs text-blue-300 uppercase tracking-widest mb-4 font-bold">Core Product</span>
                       <p className="text-4xl font-bold text-white mb-2 leading-tight drop-shadow-md">{companies[activeIndex].back.product}</p>
                       <p className="text-slate-400 text-sm">行业领先工艺标准</p>
                    </div>
                    
                    {/* 右侧 */}
                    <div className="flex flex-col gap-6">
                       <div className="flex-1 bg-white/[0.03] rounded-3xl p-8 flex flex-col justify-center border border-white/5 hover:border-white/10 transition-colors">
                          <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Annual Capacity</span>
                          <p className="text-3xl font-mono text-white">{companies[activeIndex].back.capacity}</p>
                       </div>
                       <div className="flex-1 bg-white/[0.03] rounded-3xl p-8 flex flex-col justify-center border border-white/5 hover:border-white/10 transition-colors">
                          <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Key Partners</span>
                          <p className="text-2xl text-slate-200">{companies[activeIndex].back.partner}</p>
                       </div>
                    </div>
                 </div>

                 {/* 底部 */}
                 <div className="h-16 border-t border-white/10 flex items-center justify-between px-10 bg-black/40">
                     <div className="text-[10px] text-slate-500 font-mono tracking-widest">
                        ENCRYPTED CONNECTION // SECURE
                     </div>
                     <button className="text-xs text-slate-400 hover:text-white flex items-center gap-2 uppercase tracking-wider group">
                        <ReloadOutlined className="rotate-180 group-hover:-rotate-180 transition-transform duration-500" /> Return
                     </button>
                 </div>
             </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default SilicaIndustry;