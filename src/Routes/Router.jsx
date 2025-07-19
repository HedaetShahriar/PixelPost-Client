import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
// import ErrorPage from "../components/ErrorPage/ErrorPage";
import Membership from "../pages/Membership";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import PostDetails from "../pages/PostDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            // {
            //     path: "/post/:postId",
            //     element: <PostDetails />,
            // },
            // {
            //     path: "/membership",
            //     element: <Membership />,
            // }
        ],
    },
    {
        path: "/auth/login",
        element: <SignIn />,
    },
    {
        path: "/auth/register",
        element: <Register />,
    },
    // {
    //     path: "/dashboard",
    //     element: <PrivateRoutes>
    //         <DashboardLayout />
    //     </PrivateRoutes>,
    //     children:[
    //         {
    //             index: true,
    //             element: <div>My Profile</div>
    //         },
    //         {
    //             path: "/my-profile",
    //             element: <div>My Profile</div>,
    //         },
    //         {
    //             path: "/add-post",
    //             element: <div>Add Post</div>
    //         },
    //         {
    //             path: "/my-posts",
    //             element: <div>My Posts</div>
    //         },
    //         {
    //             path: "/admin-profile",
    //             element: <div>Admin Profile</div>
    //         },
    //         {
    //             path: "/manage-users",
    //             element: <div>Manage Users</div>
    //         },
    //         {
    //             path: "/reported-comments",
    //             element: <div>Reported Comments</div>
    //         },
    //         {
    //             path: "/make-announcement",
    //             element: <div>Make Announcement</div>
    //         }
    //     ]
    // }
]);