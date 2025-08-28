import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@/assets/icons/Home.svg?react";
import BurgerIcon from "@/assets/icons/burger.svg?react";

// 탭에 들어갈 항목 정의 - 재렌더링 방지
const TABS = [
  { id: "map", icon: HomeIcon, path: "/map" },
  { id: "menu", icon: BurgerIcon, path: "/nearby" },
];

export default function NavBar() {
  const { pathname } = useLocation(); // 현재 URL 경로 가져오기

  return (
    <nav
      aria-label="bottom navigation" // 접근성(스크린리더)용 네비게이션 이름
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2" // 화면 하단 중앙 고정
    >
      {/* 실제 네비게이션 컨테이너 */}
      <div className="relative flex gap-8 rounded-full bg-white px-8 py-3 shadow-xl">
        {/* 탭 항목 반복 렌더링 */}
        {TABS.map(({ id, icon: Icon, path }) => {
          const isActive = pathname.startsWith(path);

          return (
            <Link
              key={id}
              to={path}
              className="relative flex h-10 w-10 items-center justify-center"
              aria-current={isActive ? "page" : undefined}
            >
              {/* 활성화된 탭일 경우, 배경 원 애니메이션 표시 */}
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-primary-blue "
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {/* 탭 아이콘 */}
              <Icon
                className={`relative z-10 h-6 w-6 ${
                  isActive ? "text-white" : "text-primary-blue"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
