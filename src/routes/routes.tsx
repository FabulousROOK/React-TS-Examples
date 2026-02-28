import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/general/Home";
import Login from "../pages/general/Login";
import GeneralNotFound from "../pages/notfound/GeneralNotFound";
import DashboardMain from "../pages/features/DashboardMain";
//import DashboardLayout from "../layouts/DashboardLayout";
import InventoryControls from "../pages/features/InventoryControls";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },

        ]
    
    },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <DashboardMain />,
            },
            {
                path: "inventory",
                element: <InventoryControls />,
            }
        ],
    },
    
    {
        path: "*",
        element: <GeneralNotFound />,
    }
])