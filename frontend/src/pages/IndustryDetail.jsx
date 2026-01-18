import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import SilicaIndustry from '../components/SilicaIndustry'; // 引入组件

const IndustryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = database.industries ? database.industries.find(i => i.id === id) : null;

  if (!item) return <div className="pt-32 text-center">内容未找到</div>;

  // === 特殊逻辑：如果是【硅砂工业】，进入 PPT 沉浸模式 ===
  if (id === 'secondary') {
   return (
     // 改动：背景使用 radial-gradient，从深灰到纯黑，增加通透感
     <div className="h-screen w-full bg-[#050505] overflow-hidden relative flex flex-col font-sans">
        
        {/* 背景光效：中间稍微亮一点，四周暗 */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-black to-black"></div>
        
        {/* 噪点纹理：增加胶片质感 */}
        <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* 顶部导航 */}
        <div className="relative z-20 px-10 py-8 flex justify-between items-center">
           <button 
              onClick={() => navigate('/industry')}
              className="text-slate-400 hover:text-white flex items-center gap-3 transition-all px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 group"
           >
              <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform"/> 
              <span className="text-sm font-medium tracking-wide">BACK TO INDEX</span>
           </button>
           <div className="text-right">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 tracking-widest uppercase mb-1">
                {item.title}
              </h1>
              <div className="flex justify-end items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">Interactive View</p>
              </div>
           </div>
        </div>

        {/* 核心交互区 */}
        <div className="relative z-10 flex-grow flex items-center justify-center">
           {item.companies ? (
              <SilicaIndustry companies={item.companies} />
           ) : (
              <div className="text-white">暂无企业数据</div>
           )}
        </div>
        
     </div>
   );
 }
  // === 常规逻辑：其他产业 (农业、旅游) 保持原样 ===
  const colorMap = {
    green: "text-green-700 bg-green-50 border-green-200",
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    orange: "text-orange-700 bg-orange-50 border-orange-200",
  };
  const themeClass = colorMap[item.color] || colorMap.green;

  return (
    <div className="bg-white min-h-screen pb-20">
       {/* 顶部 Hero */}
       <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
          <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
             <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wider">{item.title}</h1>
             <p className="text-lg md:text-xl opacity-90 font-light tracking-widest uppercase">{item.subtitle}</p>
          </div>
          <button onClick={() => navigate('/industry')} className="absolute top-24 left-6 md:left-12 text-white/80 hover:text-white flex items-center gap-2 transition-colors z-10">
             <ArrowLeftOutlined /> 返回列表
          </button>
       </div>

       <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
          <div className="bg-white rounded-t-3xl shadow-xl p-8 md:p-12 min-h-[400px]">
             <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
             </div>
          </div>

          {/* 助农市集 (仅在常规页面显示) */}
          <div className="mt-12">
             <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${themeClass}`}>
                   <ShoppingCartOutlined />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-900">特色产品推荐</h2>
                   <p className="text-xs text-gray-400">Support Locals · 助力乡村振兴</p>
                </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {item.products && item.products.map((product, idx) => (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                   >
                      <div className="h-40 overflow-hidden relative">
                         <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name}/>
                      </div>
                      <div className="p-4">
                         <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                         <div className="flex justify-between items-center mt-3">
                            <span className="text-red-600 font-bold">{product.price}</span>
                            <a href={product.link} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors">购买</a>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default IndustryDetail;