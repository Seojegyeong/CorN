import { Star } from "lucide-react";
import cx from "clsx";

type SignalStatus = "green" | "red" | "yellow";

type SignalCardProps = {
  title: string;
  address: string;
  status: SignalStatus; // 신호 상태
  statusLabel?: string; // 표시 텍스트(없으면 기본 매핑 사용)
  thumbnail: string; // 이미지 URL
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onClick?: () => void; // 카드 클릭(상세로 이동 등)
  className?: string;
};

const STATUS = {
  green: { label: "초록불", dot: "bg-[#22c55e]" },
  red: { label: "빨간불", dot: "bg-[#ef4444]" },
  yellow: { label: "노란불", dot: "bg-[#facc15]" },
} as const;

export default function SignalCard({
  title,
  address,
  status,
  statusLabel,
  thumbnail,
  isFavorite = false,
  onToggleFavorite,
  onClick,
  className,
}: SignalCardProps) {
  const s = STATUS[status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group flex w-full items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-md",
        "transition hover:shadow-lg active:scale-[0.99]",
        className
      )}
    >
      {/* 왼쪽: 텍스트 */}
      <div className="min-w-0 text-left">
        <div className="truncate text-[15px] font-semibold text-default-gray-800">
          {title}
        </div>
        <div className="truncate text-[12px] text-default-gray-500">
          {address}
        </div>

        <div className="mt-2 inline-flex items-center gap-1 text-[12px] text-default-gray-700">
          <span className={cx("h-2 w-2 rounded-full", s.dot)} />
          <span>{statusLabel ?? s.label}</span>
        </div>
      </div>

      {/* 오른쪽: 썸네일 + 즐겨찾기 */}
      <div className="relative shrink-0">
        <div className="size-14 overflow-hidden rounded-full">
          <img
            src={thumbnail}
            alt={`${title} 썸네일`}
            className="h-full w-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 카드 onClick과 분리
            onToggleFavorite?.();
          }}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
          className={cx(
            "absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full shadow",
            "transition",
            isFavorite ? "bg-[#facc15] text-white" : "bg-white text-[#facc15]"
          )}
        >
          <Star
            className="size-4"
            // 채우기/비우기 느낌
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
    </button>
  );
}
