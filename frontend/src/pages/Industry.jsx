import React from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowRightOutlined } from '@ant-design/icons';

const Industry = () => {
  const navigate = useNavigate();
  // 读取新结构的数据 (如果没有 industries 防止报错)
  const industries = database.industries || [];

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 标题 */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">绿色产业体系</h1>
            <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
                从传统的沙地农业到现代化的硅砂工业，再到蓬勃发展的全域旅游，<br/>彰武正在构建“三产融合”的绿色发展新格局。
            </p>
        </div>

        {/* 垂直卡片列表 (更适合展示丰富信息) */}
        <div className="space-y-12">
            {industries.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex flex-col md:flex-row group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer h-auto md:h-[400px] ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  onClick={() => navigate(`/industry/${item.id}`)}
                >
                    {/* 图片区域 (占一半) */}
                    <div className="w-full md:w-1/2 overflow-hidden relative">
                       <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title}/>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>

                    {/* 文字区域 (占一半) */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                       <div className={`w-12 h-1 bg-${item.color === 'green' ? 'green-600' : item.color === 'blue' ? 'blue-600' : 'orange-500'} mb-6`}></div>
                       <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">{item.title}</h2>
                       <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-6">{item.subtitle}</p>
                       <p className="text-gray-600 leading-relaxed text-lg mb-8">
                          {item.summary}
                       </p>
                       
                       <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:translate-x-2 transition-transform">
                          深入了解 <ArrowRightOutlined />
                       </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Industry;