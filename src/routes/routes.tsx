import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import JoinPage from "../pages/auth/JoinPage";
import Map from "../pages/map/Map";
import NearbyList from "@/pages/nearby/NearbyList";
import Layout from "@/layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/map",
    element: <Layout />,
    children: [{ index: true, element: <Map /> }],
  },
  {
    path: "/nearby",
    element: <Layout />,
    children: [{ index: true, element: <NearbyList /> }],
  },
]);

export default router;
