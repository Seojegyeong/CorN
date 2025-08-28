import cx from "clsx"; // clsx : 여러 개 className 합치는 라이브러리

type ButtonProps = {
  size?: "small" | "middle";
  variant?: "blue" | "gray" | "naver";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode; // 버튼 내부에 들어갈 텍스트 or 아이콘
};

export default function Button({
  size = "small",
  variant = "gray",
  disabled = false,
  onClick,
  className,
  type = "button",
  children,
}: ButtonProps) {
  // 공통
  const base =
    "inline-flex items-center justify-center select-none font-body " +
    "transition-colors duration-200 disabled:cursor-not-allowed";

  // select-none: 텍스트 드래그 방지
  // transition-colors duration-200: 색상 전환 0.2초

  // 사이즈 프리셋
  const sizeClasses = {
    small: "h-10 px-4 text-sm rounded-md",
    middle: "h-14 w-full text-base rounded-md",
  };

  // varient 별 class 정의
  // focus-visible:ring-* 로 키보드 포커스 링
  const variantClasses = {
    blue:
      "bg-primary-blue text-white  " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue",
    gray:
      "bg-default-gray-400 text-default-gray-800  " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-gray-700",

    naver:
      "bg-[#03C75A] text-white " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        base,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
