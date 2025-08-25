// src/components/map/MapDetail.tsx
import { useEffect } from "react";
import { Volume2, Move, Clock, ClockAlert, Pencil, X } from "lucide-react";
import clsx from "clsx";

type MapDetailProps = {
  open: boolean; // ← 열림/닫힘 상태
  title: string;
  content: string;
  onClose: () => void;
};

export default function MapDetail({
  open,
  title,
  content,
  onClose,
}: MapDetailProps) {
  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[1000]", // z-1000 대신 z-[1000]
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Dimmed */}
      <div
        className={clsx(
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <section
        className={clsx(
          "absolute bottom-0 left-0 w-full rounded-t-2xl bg-white p-6",
          "pointer-events-auto transition-transform duration-300",
          open ? "translate-y-0" : "translate-y-full"
        )}
        style={{ height: "33vh" }} // 화면 1/3
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-detail-title"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-black"
          aria-label="닫기"
        >
          <X className="h-6 w-6" />
        </button>

        {/* 타이틀 */}
        <div className="mb-2 flex items-center gap-2">
          <h2 id="map-detail-title" className="text-lg font-semibold">
            {title}
          </h2>
          <Pencil className="h-4 w-4 text-gray-500" />
        </div>

        {/* 내용 */}
        <p className="mb-4 text-gray-600">{content}</p>

        {/* 원형 프로그레스바 자리 */}
        <div>원형 프로그레스바 넣을 예정</div>

        {/* 하단 아이콘 4개 */}
        <div className="mt-10 grid grid-cols-4 gap-4 text-center text-sm text-gray-700">
          <div className="flex flex-col items-center">
            <Volume2 className="h-5 w-5 text-blue-500" />
            <span>신호음 지원</span>
          </div>
          <div className="flex flex-col items-center">
            <Move className="h-6 w-6 text-blue-500" />
            <span>보행자 버튼</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-6 w-6 text-blue-500" />
            <span>시작 06:00</span>
          </div>
          <div className="flex flex-col items-center">
            <ClockAlert className="h-6 w-6 text-blue-500" />
            <span>종료 23:00</span>
          </div>
        </div>
      </section>
    </div>
  );
}
