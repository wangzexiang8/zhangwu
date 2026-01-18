import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // 1. 引入新文件

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* 页面中间的内容 */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 2. 使用新组件 */}
      <Footer />
    </div>
  );
};

export default Layout;