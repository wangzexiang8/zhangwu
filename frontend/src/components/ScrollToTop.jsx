import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 只要路径 (pathname) 发生变化，就强制滚动到 (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 这个组件只负责干活，不渲染任何画面
}