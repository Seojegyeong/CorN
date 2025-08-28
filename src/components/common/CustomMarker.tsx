const CustomMarker = ({
  time,
  color = "#00C471",
}: {
  time: number;
  percent: number;
  color?: string;
}) => {
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
      {/* 원형 프로그레스바 자리 */}
      <div className="flex justify-center items-center">
        <div
          className="w-[45px] h-[45px] flex justify-center items-center transition-all duration-200"
          style={{
            background: `conic-gradient(#22c55e 30%, #e6e6e6 0%)`,
            borderRadius: "50%",
          }}
        >
          <div className="w-[60%] h-[60%] rounded-full bg-white flex justify-center items-center"></div>
        </div>
      </div>

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
