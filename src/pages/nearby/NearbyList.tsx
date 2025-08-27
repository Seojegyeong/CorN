import { useState, useMemo } from "react";
import { MapPin, Star } from "lucide-react";
import SignalCard from "@/components/signList/SignalCard";
import NoImage from "@/assets/images/noimg.png";

type Signal = {
  id: number;
  title: string;
  address: string;
  status: "red" | "green";
  thumbnail: string;
  favorite: boolean;
};

const data: Signal[] = [
  {
    id: 1,
    title: "우리집 앞 신호등",
    address: "서울특별시 성북구 동선동 5가 150-3",
    status: "green",
    thumbnail: NoImage,
    favorite: true,
  },
  {
    id: 2,
    title: "CU 앞 신호등",
    address: "서울특별시 성북구 동선동 5가 150-3",
    status: "red",
    thumbnail: NoImage,
    favorite: false,
  },
];

export default function NearbyList() {
  const [selectedTab, setSelectedTab] = useState<"list" | "bookmark">("list");
  const [signals, setSignals] = useState<Signal[]>(data);

  // 즐겨찾기 토글
  const handleToggleFavorite = (id: number) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
  };

  // 상세 열기 (라우터 연결 전)
  const handleOpenDetail = (id: number) => {
    console.log("open detail", id);
    // e.g., navigate(`/signal/${id}`)
  };

  // 탭에 따라 필터
  const filteredData = useMemo(() => {
    return selectedTab === "list" ? signals : signals.filter((s) => s.favorite);
  }, [signals, selectedTab]);

  return (
    <div className="flex flex-col h-screen bg-white font-spoqa">
      {/* 헤더 */}
      <header className="flex justify-center pt-8 pb-5">
        <h1 className="text-xl font-bold">내 주변 신호등</h1>
      </header>

      {/* 탭 메뉴 */}
      <div className="relative">
        <div className="flex">
          <button
            onClick={() => setSelectedTab("list")}
            className={`flex-1 py-3 text-center font-bold ${
              selectedTab === "list" ? "text-[#000000]" : "text-[#D9D9D9]"
            }`}
          >
            목록 보기
          </button>
          <button
            onClick={() => setSelectedTab("bookmark")}
            className={`flex-1 py-3 text-center font-bold ${
              selectedTab === "bookmark" ? "text-[#000000]" : "text-[#D9D9D9]"
            }`}
          >
            즐겨찾기
          </button>
        </div>

        {/* 밑줄 */}
        <div
          className={`absolute bottom-0 w-[50%] h-[3px] bg-primary-green rounded-full transition-all duration-300 ${
            selectedTab === "list" ? "left-0" : "left-1/2"
          }`}
        />
      </div>

      {/* 위치 정보 */}
      <div className="flex justify-between items-center px-4 py-3 text-sm text-[#666666]">
        <p>
          내 주변에{" "}
          <span className="text-primary-green font-bold">
            {filteredData.length}개
          </span>{" "}
          의 신호등이 있어요
        </p>
        <div className="flex items-center gap-1 text-primary-green text-sm font-medium">
          <MapPin className="w-4 h-4" />
          <span>성북구 동선동</span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-[#999]">
            <Star className="w-8 h-8 mb-3" />
            <p className="font-medium">
              {selectedTab === "bookmark"
                ? "즐겨찾기한 신호등이 없어요"
                : "표시할 신호등이 없어요"}
            </p>
            {selectedTab === "bookmark" && (
              <p className="text-sm mt-1">목록에서 ★를 눌러 추가해보세요</p>
            )}
          </div>
        ) : (
          filteredData.map((item) => (
            <SignalCard
              key={item.id}
              title={item.title}
              address={item.address}
              status={item.status}
              thumbnail={item.thumbnail}
              isFavorite={item.favorite}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
              onClick={() => handleOpenDetail(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
