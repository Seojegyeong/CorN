import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { LocateIcon, StarIcon } from "lucide-react";
import CustomMarker from "@/components/common/CustomMarker";
import MapDetail from "./MapDetali";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [modalInfo, setModalInfo] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) {
      console.error("window.naver 또는 mapRef가 없습니다.");
      return;
    }

    // 지도 생성
    const mapInstance = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.51329, 126.94205),
      zoom: 15,
    });
    setMap(mapInstance);

    // 커스텀 마커 HTML
    const contentString = ReactDOMServer.renderToString(
      <CustomMarker time={15} percent={0.25} />
    );

    // 마커 생성
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.51329, 126.94205),
      map: mapInstance,
      icon: {
        content: contentString,
        size: new naver.maps.Size(50, 60),
        anchor: new naver.maps.Point(25, 60),
      },
    });

    // 클릭 리스너
    const clickListener = naver.maps.Event.addListener(marker, "click", () => {
      setModalInfo({
        title: "신호등 정보",
        content: "여기에 신호등 상세 정보가 표시됩니다.",
      });
    });

    // 클린업
    return () => {
      if (clickListener) naver.maps.Event.removeListener(clickListener);
      marker.setMap(null);
    };
  }, []);

  // 현재 위치로 이동
  const moveToMyLocation = () => {
    if (!map) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const center = new naver.maps.LatLng(coords.latitude, coords.longitude);
        map.setCenter(center);
      },
      (error) => {
        console.error("위치 접근 오류:", error);
        alert("현재 위치를 가져올 수 없습니다.");
      }
    );
  };

  return (
    <>
      {/* 지도 */}
      <div ref={mapRef} className="relative z-0 h-screen w-full" />

      {/* 모달 (modalInfo가 있으면 노출) */}
      {modalInfo && (
        <MapDetail
          open={true}
          title={modalInfo.title}
          content={modalInfo.content}
          onClose={() => setModalInfo(null)}
        />
      )}

      {/* 우측 상단 유틸 버튼 */}
      <div className="font-spoqa absolute right-4 top-10 z-50 flex flex-col gap-3">
        <button
          onClick={() => alert("즐겨찾기 보기 기능은 추후 구현 예정")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:bg-primary-light"
        >
          <StarIcon className="h-5 w-5 text-primary" fill="currentColor" />
        </button>

        <button
          onClick={moveToMyLocation}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:bg-gray-100"
        >
          <LocateIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </>
  );
}
