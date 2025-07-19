import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router";
import {
  Home, User, PlusSquare, FileText,
  Menu, X, ShieldCheck
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = false; // Update this dynamically later

  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/membership" className="flex items-center gap-2">
          <ShieldCheck size={18} /> Membership
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard/my-profile" className="flex items-center gap-2">
          <User size={18} /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-post" className="flex items-center gap-2">
          <PlusSquare size={18} /> Add Post
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-posts" className="flex items-center gap-2">
          <FileText size={18} /> My Posts
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/admin-profile" className="flex items-center gap-2">
          <User size={18} /> Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-users" className="flex items-center gap-2">
          <User size={18} /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/reported-comments" className="flex items-center gap-2">
          <FileText size={18} /> Reported Comments
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/make-announcement" className="flex items-center gap-2">
          <PlusSquare size={18} /> Make Announcement
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-72 bg-base-200 p-6 border-r border-gray-200">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <span className="text-2xl font-bold sora-font">PixelPost</span>
        </Link>

        <ul className="space-y-2">
          {isAdmin ? adminLinks : userLinks}
          <div className="divider" />
          {commonLinks}
        </ul>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden w-full sticky top-0 z-50 bg-base-200 border-b border-gray-300">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="w-9 h-9" alt="Logo" />
            <span className="text-xl font-semibold sora-font">PixelPost</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="bg-base-100 px-4 py-2 shadow transition-all duration-300">
            <ul className="space-y-2">
              {isAdmin ? adminLinks : userLinks}
              <div className="divider" />
              {commonLinks}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
