import tailwindcss from "@tailwindcss/vite"; // TailwindCSS Vite 플러그인
import react from "@vitejs/plugin-react-swc"; // React (SWC 기반, 더 빠른 컴파일러)
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// Vite 설정 내보내기
export default defineConfig({
  plugins: [
    react(), // React + SWC 플러그인
    svgr({ include: "**/*.svg?react" }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
