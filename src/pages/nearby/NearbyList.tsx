import SignalCard from "@/components/signList/SignalCard";

const data = [
  {
    id: 1,
    title: "우리집 앞 신호등",
    address: "서울특별시 성북구 동선동 5가 150-3",
    status: "green" as const,
    thumbnail: "/images/sample1.jpg",
    favorite: true,
  },
  {
    id: 2,
    title: "CU 앞 신호등",
    address: "서울특별시 성북구 동선동 5가 150-3",
    status: "red" as const,
    thumbnail: "/images/sample2.jpg",
    favorite: false,
  },
];

export default function NearbyList() {
  return (
    <div className="space-y-4 p-4">
      {data.map((item) => (
        <SignalCard
          key={item.id}
          title={item.title}
          address={item.address}
          status={item.status}
          thumbnail={item.thumbnail}
          isFavorite={item.favorite}
          onToggleFavorite={() => console.log("toggle", item.id)}
          onClick={() => console.log("open detail", item.id)}
        />
      ))}
    </div>
  );
}
