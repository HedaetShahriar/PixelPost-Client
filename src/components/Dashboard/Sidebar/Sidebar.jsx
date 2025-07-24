import logo from '../../../assets/logo.png';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { CircleUserRound, LogOut, MenuIcon } from 'lucide-react';
import UserMenu from './Menu/UserMenu';
import AdminMenu from './Menu/AdminMenu';
import ThemeToggle from '../../ui/ThemeToggle';
import LoadingSpinner from '../../Loader/LoadingSpinner';
import MenuItem from './Menu/MenuItem';
import useUser from '../../../hooks/useUser';

const Sidebar = () => {
    const { logOut } = useAuth();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();
    const { role } = user || {};
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div className='md:hidden bg-base-300 shadow-md navbar'>
                {/* Navbar Start: Logo */}
                <div className="navbar-start">
                    <div className='flex items-center gap-2'>
                        <Link to="/">
                            <img src={logo} className='w-10 h-10' alt="" />
                        </Link>
                        <Link to="/" className="text-xl sora-font font-bold">
                            PixelPost
                        </Link>
                    </div>
                </div>

                {/* Navbar End: Theme toggle and dropdown menu */}
                <div className="navbar-end">
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {/* Dropdown */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <MenuIcon className="w-6 h-6" />
                            </label>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-66"
                            >
                                <h1 className='font-bold text-center mt-2'>Dashboard</h1>
                                <div className='divider my-0'></div>
                                <MenuItem
                                    address={'/dashboard'}
                                    icon={CircleUserRound}
                                    label={role === 'admin' ? "Admin Profile" : "My Profile"}
                                />
                                {role === 'user' && <UserMenu />}
                                {role === 'admin' && <AdminMenu />}

                                <div className='divider my-0'></div>
                                <button
                                    onClick={() => {
                                        logOut();
                                        navigate('/', { replace: true });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-xl">
                                    <LogOut className='w-5 h-5' />
                                    <span>Logout</span>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            {/* Sidebar */}
            <div
                className={`flex flex-col justify-between py-5 p-3 bg-base-200 min-h-screen inset-y-0 left-0 fixed transform transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0 md:static md:z-auto`}
            >
                {/* Logo Section */}
                <div>
                    <div className=" flex items-center gap-2">
                        <Link to="/">
                            <img src={logo} className="md:w-12 md:h-12 w-10 h-10 md:ml-2" alt="PixelPost" />
                        </Link>
                        <Link to="/" className="font-bold text-2xl sora-font overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 opacity-0 lg:max-w-[200px] lg:opacity-100 mx-0 lg:mx-4">PixelPost</Link>
                    </div>
                    {/* <ThemeToggle/> */}
                    <div className='divider my-0 mt-2 lg:mt-3'></div>
                    {/* Nav Items */}
                    <div className="flex flex-col justify-between flex-1">
                        <nav>
                            <MenuItem
                                address={'/dashboard'}
                                icon={CircleUserRound}
                                label={role === 'admin' ? "Admin Profile" : "My Profile"}
                            />
                            {role === 'user' && <UserMenu />}
                            {role === 'admin' && <AdminMenu />}
                        </nav>
                    </div>
                </div>

                {/* Bottom: Profile & Logout */}
                <div>
                    {/* Theme toggle with label */}
                    <div className="flex w-full items-center px-4 py-2 text-gray-600 transform md:-ml-1.5 lg:-ml-0">
                        <span
                            className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 opacity-0 lg:max-w-[200px] lg:opacity-100 mx-0 lg:mr-2.5"
                        >Theme Mode :
                        </span>
                        <ThemeToggle size={34} />
                    </div>
                    <div className='divider my-0 mt-1'></div>
                    <button
                        onClick={() => {
                            logOut();
                            navigate('/', { replace: true });
                        }}
                        className="flex w-full items-center px-4 py-2 mt-1 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform md:rounded-full lg:rounded-2xl"
                    >
                        <LogOut className="md:w-8 md:h-8 w-5 h-5 lg:w-6 lg:h-6" />

                        {/* Animate label between md and lg */}
                        <span
                            className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 opacity-0 lg:max-w-[200px] lg:opacity-100 mx-0 lg:mx-4"
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
