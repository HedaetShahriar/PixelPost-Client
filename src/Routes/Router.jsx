import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import Membership from "../pages/Membership";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import PostDetails from "../pages/PostDetails";
import MakeAnnouncement from "../pages/Dashboard/AdminPages/MakeAnnouncement";
import ReportedComments from "../pages/Dashboard/AdminPages/ReportedComments";
import ManageUsers from "../pages/Dashboard/AdminPages/ManageUsers";
import Profile from "../components/Dashboard/Shared/Profile";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/post/:postId",
                element: <PostDetails />,
            },
            {
                path: "/membership",
                element: <PrivateRoutes><Membership /></PrivateRoutes>,
            }
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
    {
        path: "/dashboard",
        element: <PrivateRoutes>
            <DashboardLayout />
        </PrivateRoutes>,
        children:[
            {
                index: true,
                element: <Profile />,
            },
            {
                path: "my-profile",
                element: <div>My Profile</div>,
            },
            {
                path: "add-post",
                element: <div>Add Post</div>
            },
            {
                path: "my-posts",
                element: <div>My Posts</div>
            },
            {
                path: "admin-profile",
                element: <div>Admin Profile</div>
            },
            {
                path: "manage-users",
                element: <ManageUsers />
            },
            {
                path: "reported-comments",
                element: <ReportedComments />
            },
            {
                path: "make-announcement",
                element: <MakeAnnouncement />
            }
        ]
    }
]);