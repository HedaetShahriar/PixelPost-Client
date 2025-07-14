import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/dashboard",
                element: <div>Dashboard Page</div>,
            },
        ],
    },
    {
        path: "/auth/login",
        element:<SignIn />,
    },
    {
        path: "/auth/register",
        element: <Register />,
    },
]);