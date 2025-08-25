import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import JoinPage from "../pages/auth/JoinPage";
import Map from "../pages/map/Map";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/map",
    element: <Map />,
  },
]);

export default router;
