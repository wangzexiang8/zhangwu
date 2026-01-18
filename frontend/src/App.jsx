import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TourDetail from './pages/TourDetail';
// 1. 引入布局
import Layout from './components/Layout';

// 2. 引入所有页面组件 (这才是这一步的关键！)
import Home from './pages/Home';
import Spirit from './pages/Spirit';
import PersonDetail from './pages/PersonDetail';
import Industry from './pages/Industry';
import Tours from './pages/Tours'; // <--- 刚才这里是空的，现在引入真的文件
import About from './pages/About'; // <--- 刚才这里是空的，现在引入真的文件

function App() {
  const [loading, setLoading] = useState(true);

  // 开屏动画定时器
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* === 开屏动画 (全站级别) === */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            initial={{ y: 0 }} 
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[9999] bg-[#001529] flex items-center justify-center text-white"
          >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h2 className="text-6xl md:text-9xl font-serif italic tracking-widest mb-8 font-black">
            瀚海筑梦</h2>
               <div className="w-16 h-[1px] bg-white/30 mx-auto overflow-hidden">
                <motion.div className="w-full h-full bg-white" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5 }} />
              </div>
              <p className="mt-4 text-xs tracking-[0.3em] opacity-70"><h5>大工 × 彰武</h5></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === 路由配置 === */}
      <Routes>
        <Route path="/" element={<Layout />}>
          
          {/* 首页 */}
          <Route index element={<Home />} />
          
          {/* 治沙精神 & 人物详情 */}
          <Route path="spirit" element={<Spirit />} />
          <Route path="spirit/people/:id" element={<PersonDetail />} />

          {/* 绿色产业 */}
          <Route path="industry" element={<Industry />} />
          
          {/* 全域旅游 (真的地图页面) */}
          <Route path="tours" element={<Tours />} />
          {/*动态路由 */}
          <Route path="tours/:id" element={<TourDetail />} />
          {/* 关于我们 (真的团队页面) */}
          <Route path="about" element={<About />} />
          
          {/* 404 页面 (兜底) */}
          <Route path="*" element={<div className="pt-32 text-center text-xl">404 - 页面未找到</div>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;