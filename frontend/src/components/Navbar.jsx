import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. 判断是否在首页
  const isHome = location.pathname === '/';

  // 2. 监听滚动
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20); // 稍微一滑就变色
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === 3. 核心样式逻辑 (Fancy Glassmorphism) ===
  
  // 导航栏容器样式
  const navClass = `fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
    isScrolled || !isHome
      ? 'bg-white/70 backdrop-blur-md shadow-sm py-3 border-b border-white/20' // 滑动后：半透明磨砂白 + 模糊效果
      : 'bg-transparent py-6 border-transparent' // 顶部时：完全透明，稍微宽一点
  }`;

  // 文字颜色控制
  // 首页在顶部时用白色(White)，其他情况(滑动后或在子页面)用深灰(Slate-800)
  const textColor = (isScrolled || !isHome) ? "text-slate-800" : "text-white";
  const hoverColor = "hover:text-green-600"; // 悬停变成 Logo 同款的绿色

  // 链接通用样式
  const linkClass = `text-[15px] font-medium tracking-wide transition-all duration-300 flex items-center gap-1 px-3 py-2 rounded-full hover:bg-black/5 ${textColor} ${hoverColor}`;
  
  // 激活状态样式 (加个绿色小圆点或下划线)
  const activeClass = "font-bold text-green-700 bg-green-50/50";

  // === 下拉菜单配置 ===
  const spiritMenu = {
    items: [
      { key: 'history', label: '⏳ 治沙历史', onClick: () => navigate('/spirit?tab=history') },
      { key: 'people', label: '🏆 杰出代表', onClick: () => navigate('/spirit?tab=people') },
    ]
  };

  const industryMenu = {
    items: [
      { key: 'agri', label: '🍠 精品农业', onClick: () => navigate('/industry?tab=agriculture') },
      { key: 'ind', label: '🏭 现代工业', onClick: () => navigate('/industry?tab=industrial') },
      { key: 'live', label: '🐄 畜牧养殖', onClick: () => navigate('/industry?tab=livestock') },
    ]
  };

  const isActive = (path) => location.pathname.includes(path) && (isScrolled || !isHome) ? activeClass : "";

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo区域 */}
        <Link to="/" className="flex items-center gap-3 group">
           <img 
             src="/team-logo.jpg" 
             className={`w-10 h-10 rounded-full border-2 transition-all duration-500 ${isScrolled || !isHome ? 'border-green-600 shadow-md' : 'border-white/50'}`} 
             alt="Logo"
           />
           <div className={`flex flex-col transition-colors duration-300 ${textColor}`}>
             <span className="font-serif font-bold text-lg leading-none tracking-widest group-hover:text-green-600 transition-colors">
               大连理工大学
             </span>
             <span className="text-[10px] opacity-80 uppercase tracking-wider mt-1">
               瀚海筑梦 · 守绿传薪
             </span>
           </div>
        </Link>

        {/* 菜单区域 */}
        <div className="hidden md:flex gap-2">
          <Link to="/" className={`${linkClass} ${location.pathname === '/' ? isActive('/') : ''}`}>
            首页
          </Link>

          <Dropdown menu={spiritMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
             <button className={`${linkClass} ${isActive('/spirit')}`}>
                治沙精神 <DownOutlined className="text-[10px] opacity-60 ml-1"/>
             </button>
          </Dropdown>

          <Dropdown menu={industryMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
             <button className={`${linkClass} ${isActive('/industry')}`}>
                彰武产业 <DownOutlined className="text-[10px] opacity-60 ml-1"/>
             </button>
          </Dropdown>

          <Link to="/tours" className={`${linkClass} ${isActive('/tours')}`}>
            研学路线
          </Link>

          <Link to="/about" className={`${linkClass} ${isActive('/about')}`}>
            关于我们
          </Link>
          
          {/* 这里加了一个 Fancy 的“登录/搜索”按钮，磨砂玻璃球效果 */}
          <div className={`ml-4 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all ${
              isScrolled || !isHome 
                ? 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600' 
                : 'bg-white/20 text-white hover:bg-white hover:text-green-900 backdrop-blur-sm'
            }`}>
             <span className="font-serif font-bold text-xs">EN</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;