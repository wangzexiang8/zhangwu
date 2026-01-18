import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 从 database.tours 里找对应的数据
  const spot = database.tours ? database.tours.find(t => t.id === id) : null;

  if (!spot) return <div className="pt-32 text-center">景点未找到</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
       
       {/* 1. 顶部超大 Hero 图片 */}
       <div className="relative h-[50vh] w-full overflow-hidden">
          <img src={spot.img} className="w-full h-full object-cover" alt={spot.name} />
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full max-w-7xl mx-auto">
             <button onClick={() => navigate(-1)} className="mb-6 hover:bg-white/20 px-4 py-2 rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm">
                <ArrowLeftOutlined /> 返回地图
             </button>
             <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider mb-2 inline-block">
                {spot.type}
             </span>
             <motion.h1 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-serif font-bold mb-2"
             >
                {spot.name}
             </motion.h1>
             <p className="text-white/80 text-lg max-w-2xl"><EnvironmentOutlined className="mr-2"/>辽宁 · 彰武</p>
          </div>
       </div>

       {/* 2. 详情内容区域 */}
       <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* 简介 */}
          <div className="mb-12">
             <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-green-600 pl-4">景点介绍</h2>
             <p className="text-gray-600 leading-loose text-lg text-justify">
                {spot.intro}
             </p>
          </div>

          {/* 特色标签 */}
          <div className="mb-12">
             <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-green-600 pl-4">核心看点</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {spot.features && spot.features.map((feature, idx) => (
                   <div key={idx} className="bg-green-50 p-4 rounded-lg flex items-center gap-3 text-green-800 font-bold">
                      <CheckCircleOutlined /> {feature}
                   </div>
                ))}
             </div>
          </div>

          {/* 推荐行程 (Timeline) */}
          <div className="bg-slate-50 p-8 rounded-2xl">
             <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <ClockCircleOutlined /> 研学推荐行程
             </h2>
             <div className="space-y-8 relative border-l-2 border-gray-200 ml-3 pl-8">
                {spot.itinerary && spot.itinerary.map((item, idx) => (
                   <div key={idx} className="relative">
                      <span className="absolute -left-[41px] top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></span>
                      <span className="text-blue-600 font-bold block mb-1">{item.time}</span>
                      <p className="text-gray-600">{item.activity}</p>
                   </div>
                ))}
             </div>
          </div>

       </div>
    </div>
  );
};

export default TourDetail;