import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Swal from "sweetalert2";
import logo from '../assets/logo.png';
import useAuth from "../hooks/useAuth";
import Navbar from "../components/ui/Navbar";
import { saveUserInDB } from "../api/saveUserInDB";
import LoadingSpinner from "../components/Loader/LoadingSpinner";

const SignIn = () => {
    const { signInWithEmail, googleSignIn, loading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Redirect if user is already logged in
    if (user) return <Navigate to={from} replace={true} />
    if (loading) return <LoadingSpinner />

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleGoogleLogin = async () => {
        try {
            const { user } = await googleSignIn();
            const userData = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                membership: "bronze",
            };
            // Save user in database
            await saveUserInDB(userData);
            Swal.fire("Success", "Logged in with Google", "success");
            navigate(location.state?.from || "/", { replace: true });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };
    // Handle form submission
    const onSubmit = async (data) => {

        try{
            const { user } = await signInWithEmail(data.email, data.password);
            const userData = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                membership: "bronze",
            };
            // update user in database
            await saveUserInDB(userData);
            Swal.fire("Success", "Logged in successfully!", "success");
            navigate(location.state?.from || "/", { replace: true });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-250px)] p-6 md:p-10 flex items-center justify-center bg-base-200">
                <div className="bg-base-300 shadow-lg p-8 w-full flex flex-col md:flex-row rounded-4xl gap-6 md:max-w-3xl">
                    {/* Left */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img src={logo} className="w-2/5 md:w-1/2" alt="Logo" />
                        <h1 className="text-4xl font-bold text-center mb-6">PixelPost</h1>
                        <p className="text-center text-gray-600 mb-4">Sign in to unlock all the features.</p>
                    </div>

                    {/* Right */}
                    <div className="flex-1">
                        <div className="text-center flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                            <button onClick={handleGoogleLogin} className="btn w-full mb-3">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <g>
                                        <path d="m0 0H512V512H0" fill="#fff" />
                                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                                    </g>
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        <div className="divider my-2">OR</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
                            {/* Email */}
                            <label className="label mt-1">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Mail size={18} className="text-gray-400" />
                                </span>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    type="email"
                                    className={`input pl-10 w-full focus:outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Enter your Email"
                                    autoComplete="email"
                                />
                            </div>
                            <p className={`text-sm text-red-500 pl-2 transition-opacity duration-500 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                                {errors.email?.message}
                            </p>
                            {/* Password */}
                            <label className="label mt-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Lock size={18} className="text-gray-400" />
                                </span>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters required" }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="input pl-10 pr-9 w-full focus:outline-none transition-all"
                                    placeholder="Enter your Password"
                                    autoComplete="current-password"
                                />
                                <button type="button" onClick={handleShowPassword} className="absolute right-2 top-2.5 z-10 text-gray-400">
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                            <p className={`text-sm text-red-500 pl-2 transition-opacity duration-500 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
                                {errors.password?.message}
                            </p>

                            <div className="flex justify-between items-center mt-2">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="label-text ml-2">Remember me</span>
                                </label>
                                <Link to="/auth/login/forgotPassword" className="text-sm font-semibold">Forgot Password?</Link>
                            </div>

                            <button type="submit" className="btn btn-neutral mt-4">Login</button>
                        </form>

                        <p className="text-center mt-4">
                            Don’t have an account? <Link to="/auth/register" className="text-[#5dba76] font-semibold">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default SignIn;
