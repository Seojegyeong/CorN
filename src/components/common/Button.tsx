import cx from "clsx"; // clsx : 여러 개 className 합치는 라이브러리

type ButtonProps = {
  size?: "small" | "middle";
  variant?: "green" | "gray";
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
    "inline-flex items-center justify-center select-none font-medium " +
    "transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  // 스샷 기준 크기
  const sizeClasses = {
    small: "h-10 px-4 text-sm rounded-md",
    middle: "h-14 w-full text-base rounded-md",
  };

  const variantClasses = {
    green:
      "bg-primary-green text-white hover:bg-green-600 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300",
    gray:
      "bg-default-gray-400 text-default-gray-800 hover:bg-default-gray-500 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-gray-400/60",
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
