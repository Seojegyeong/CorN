import "./index.css";

import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./api/queryClient.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {import.meta.env.VITE_DEV_MODE && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
    <App />
  </QueryClientProvider>
);

/* 
개발 모드일 때만 ReactQueryDevtools 표시
.env 파일에서 VITE_DEV_MODE=true 로 설정해야 켜짐
(배포 환경에서는 보안상 안 보이도록 조건부 렌더링 처리)
*/
