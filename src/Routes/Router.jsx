import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

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
        element: <div>Login Page</div>,
    },
    {
        path: "/auth/register",
        element: <div>Register Page</div>,
    },
]);