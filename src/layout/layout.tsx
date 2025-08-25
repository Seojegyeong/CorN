import NavBar from "@/components/layout/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Outlet />
      <NavBar />
    </div>
  );
}

export default Layout;
