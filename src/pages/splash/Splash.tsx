import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import mapJson from "@/assets/MapAni.json";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-primary-blue">
      <Lottie
        loop
        animationData={mapJson}
        play
        speed={0.5}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}
