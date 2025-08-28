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
