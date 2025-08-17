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
import AdminRoutes from "./AdminRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
                element:<Membership />
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
        element:
            <PrivateRoutes>
                <DashboardLayout />
            </PrivateRoutes>,
        children: [
            {
                index: true,
                element:
                    <PrivateRoutes>
                        <Profile />
                    </PrivateRoutes>,
            },
            // {
            //     path: "my-profile",
            //     element:
            //         <PrivateRoutes>
            //             <UserProfile />
            //         </PrivateRoutes>,
            // },
            {
                path: "add-post",
                element:
                    <PrivateRoutes>
                        <AddPost />
                    </PrivateRoutes>
            },
            {
                path: "my-posts",
                element:
                    <PrivateRoutes>
                        <MyPosts />
                    </PrivateRoutes>
            },
            {
                path: "comments/:postId",
                element:
                    <PrivateRoutes>
                        <CommentsPage />
                    </PrivateRoutes>
            },
            // {
            //     path: "admin-profile",
            //     element:
            //         <PrivateRoutes>
            //             <AdminRoutes>
            //                 <AdminProfile />
            //             </AdminRoutes>
            //         </PrivateRoutes>
            // },
            {
                path: "manage-users",
                element:
                    <PrivateRoutes>
                        <AdminRoutes>
                            <ManageUsers />
                        </AdminRoutes>
                    </PrivateRoutes>
            },
            {
                path: "reported-comments",
                element:
                    <PrivateRoutes>
                        <AdminRoutes>
                            <ReportedComments />
                        </AdminRoutes>
                    </PrivateRoutes>
            },
            {
                path: "make-announcement",
                element:
                    <PrivateRoutes>
                        <AdminRoutes>
                            <MakeAnnouncement />
                        </AdminRoutes>
                    </PrivateRoutes>
            }
        ]
    }
]);