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
import UserProfile from "../pages/Dashboard/UserPages/UserProfile";
import AdminProfile from "../pages/Dashboard/AdminPages/AdminProfile";
import AddPost from "../pages/Dashboard/UserPages/AddPost";
import CommentsPage from "../pages/Dashboard/UserPages/CommentsPage";
import MyPosts from "../pages/Dashboard/UserPages/MyPosts";

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
                element: <UserProfile />,
            },
            {
                path: "add-post",
                element: <AddPost />
            },
            {
                path: "my-posts",
                element: <MyPosts />
            },
            {
                path: "comments/:postId",
                element: <CommentsPage />
            },
            {
                path: "admin-profile",
                element: <AdminProfile />
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