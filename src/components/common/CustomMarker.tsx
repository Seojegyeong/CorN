const CustomMarker = ({
  time,
  percent,
  color = "#00C471",
}: {
  time: number;
  percent: number;
  color?: string;
}) => {
  const radius = 18;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent); // 진행률 반영

  return (
    <div
      style={{
        position: "relative",
        padding: "6px 8px",
        background: "white",
        borderRadius: "15px",
        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
        fontFamily: "sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {/* 프로그레스 원형 */}
      <svg
        width={2 * (radius + strokeWidth)}
        height={2 * (radius + strokeWidth)}
      >
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + strokeWidth} ${
            radius + strokeWidth
          })`}
        />
      </svg>

      {/* 텍스트 */}
      <span style={{ fontSize: "20px", fontWeight: 700, color }}>{time}초</span>

      {/* 말풍선 꼬리 */}
      <div
        style={{
          content: '""',
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "10px solid white",
        }}
      />
    </div>
  );
};

export default CustomMarker;
