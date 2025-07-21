import React from 'react';
import logo from '../../assets/logo.png'
import userIcon from '../../assets/userIcon.png';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import { Bell, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const announcementCount = 5; // Example count, replace with actual logic if needed

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-3 py-1 rounded transition-colors duration-150 ${isActive
                            ? ""
                            : " "
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/membership"
                    className={({ isActive }) =>
                        `px-3 py-1 rounded transition-colors duration-150 ${isActive
                            ? ""
                            : ""
                        }`
                    }
                >
                    Membership
                </NavLink>
            </li>
        </>
    );
    const dropdownLinks = (
        <>
            <li>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `px-3 py-1 rounded transition-colors duration-150 ${isActive
                            ? ""
                            : ""
                        }`
                    }
                >
                    Dashboard
                </NavLink>
            </li>
        </>
    );

    return (
        <div className='bg-base-300 shadow-md'>
            <div className='container mx-auto navbar'>
                {/* Navbar Start: Mobile dropdown and Logo */}
                <div className="navbar-start">
                    <div className="flex items-center gap-2">
                        <div className="dropdown">
                            <label tabIndex={0} className="cursor-pointer md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                {navLinks}
                            </ul>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link to="/">
                                <img src={logo} className='w-10 h-10' alt="" />
                            </Link>
                            <Link to="/" className="text-xl md:text-2xl sora-font font-bold hidden md:inline-flex">
                                PixelPost
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navbar Center: Desktop navigation links */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        {navLinks}
                    </ul>
                </div>

                {/* Navbar End: Theme toggle and User profile section */}
                <div className="navbar-end">
                    <div className="flex items-center md:gap-4 gap-2">
                        <ThemeToggle />
                        <div className="relative flex items-center justify-center w-8 h-8">
                            <Bell size={26} />
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 font-semibold text-xs px-1.5 py-0.5 bg-primary text-white rounded-full">
                                {announcementCount || 0}
                            </span>
                        </div>
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar"
                                    title={user?.displayName || 'User profile'} // Show user's name on hover
                                >
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            alt="User profile picture"
                                            src={
                                                user.photoURL || userIcon
                                            }
                                            referrerPolicy='no-referrer'
                                        />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <p
                                        className='font-medium px-2 pt-2'
                                    >
                                        {user?.displayName}
                                    </p>

                                    <div className='divider my-1'></div>
                                    {dropdownLinks}
                                    <div className='divider my-1'></div>
                                    <li>
                                        <button onClick={logOut} className='btn btn-secondary btn-sm'><LogOut size={24} /> Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/auth/login" className="btn btn-primary">
                                Join Us
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;