import React from 'react';
import { Link, NavLink } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
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
                            : " "
                        }`
                    }
                >
                    Membership
                </NavLink>
            </li>
        </>
    );
    return (
        <div className='bg-base-200 text-base-content py-8'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col items-center md:items-start mb-6 md:mb-0'>
                    <div className='flex items-center gap-2'>
                        <Link to="/">
                            <img src={logo} className='w-10 h-10' alt="" />
                        </Link>
                        <Link to="/" className="text-xl md:text-2xl sora-font font-bold">
                            PixelPost
                        </Link>
                    </div>
                    <p>this is the footer content.</p>
                </div>
                <div className='flex flex-col items-center mb-6 md:mb-0'>
                    <h1 className='text-lg font-semibold text-center'>Quick Links</h1>
                    <ul className='flex '>
                        {navLinks}
                    </ul>
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-lg font-semibold'>Follow Us</h1>
                    <div className='flex items-center gap-4 mt-2'>
                        <a href="https://twitter.com/hedaetshahriar" target="_blank" rel="noopener noreferrer">
                            <Twitter className='h-6 w-6 text-blue-400' />
                        </a>
                        <a href="https://github.com/HedaetShahriar" target="_blank" rel="noopener noreferrer">
                            <Github className='h-6 w-6 text-pink-500' />
                        </a>
                        <a href="https://www.linkedin.com/in/hedaet-shahriar/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className='h-6 w-6 text-blue-700' />
                        </a>
                    </div>
                </div>

            </div>
            <p className='text-xl text-center mt-4'>© 2023 PixelPost. All rights reserved.</p>
        </div>
    );
};

export default Footer;