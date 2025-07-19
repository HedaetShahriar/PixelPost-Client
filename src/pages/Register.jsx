import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, Image, UserRound } from "lucide-react";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/ui/Navbar";

const Register = () => {
    const { registerWithEmail, googleSignIn, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const [preview, setPreview] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setPreview(URL.createObjectURL(file));
    //     }
    // };


    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire("Success", "Logged in with Google", "success");
                navigate(location.state?.from || "/", { replace: true });
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data) => {
        const imageFile = data.photoURL[0];
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("folder", "pixelpost/users");
        formData.append("public_id", `${data.name}_profile`);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                method: "POST",
                body: formData,
            });
            const imageData = await res.json();
            const imageUrl = imageData.secure_url;

            registerWithEmail(data.email, data.password)
                .then((result) => {
                    const user = result.user;
                    updateUserProfile(data.name, imageUrl)
                        .then(() => {
                            setUser(user);
                            Swal.fire("Success", "Registration successful!", "success");
                            navigate(location.state?.from || "/", { replace: true });
                        })
                        .catch((error) => {
                            Swal.fire("Error", error.message, "error");
                        });
                })
                .catch((error) => {
                    Swal.fire("Error", error.message, "error");
                });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-250px)] flex items-center justify-center bg-base-200 py-6 md:py-10">
                <div className="bg-base-300 shadow-lg p-8 w-full flex flex-col md:flex-row rounded-4xl gap-6 md:max-w-3xl lg:max-w-4xl">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img src={logo} className="w-2/5 md:w-1/2" alt="Logo" />
                        <h1 className="text-4xl font-bold text-center mb-6">Join PixelPost Community!</h1>
                        <p className="text-center text-gray-600 mb-4">Create an account to get started and unlock all the features.</p>
                    </div>

                    <div className="flex-1">
                        <div className="text-center flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4">Create Account</h2>
                            <button onClick={handleGoogleLogin} className="btn w-full mb-3">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Continue with Google
                            </button>
                        </div>

                        <div className="divider my-2">OR</div>
                        <p className="text-center">Fill in the details below to register.</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
                            <label className="label mt-1">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <UserRound size={18} className="text-gray-400" />
                                </span>
                                <input
                                    {...register("name", { required: "Full name is required" })}
                                    type="text"
                                    className="input pl-10 w-full focus:outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <p className={`text-sm text-red-500 pl-2 transition-opacity duration-500 ${errors.name ? 'opacity-100' : 'opacity-0'}`}>{errors.name?.message}</p>

                            <label className="label mt-1">Profile Photo</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Image size={18} className="text-gray-400" />
                                </span>
                                <input
                                    {...register("photoURL", { required: "Please upload a profile photo" })}
                                    type="file"
                                    accept="image/*"
                                    aria-label="Upload profile photo"
                                    aria-invalid={errors.photoURL ? "true" : "false"}
                                    className="input pl-10 w-full file:cursor-pointer file:bg-base-200 file:rounded-md file:px-3 file:py-2.5 file:mr-2 file:text-sm transition-all focus:outline-none"
                                />
                            </div>
                            <p className={`text-sm text-red-500 pl-2 transition-opacity duration-500 ${errors.photoURL ? 'opacity-100' : 'opacity-0'}`}>{errors.photoURL?.message}</p>

                            {/* <label className="label mt-1 font-medium text-gray-700">Profile Photo</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Image size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                                </span>
                                <input
                                    {...register("photoURL", { required: "Please upload a profile photo" })}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        handleImageChange(e);
                                        register("photoURL").onChange(e);
                                    }}
                                    aria-label="Upload profile photo"
                                    aria-invalid={errors.photoURL ? "true" : "false"}
                                    className="input w-full pl-10 py-2 border border-gray-500 rounded-2xl file:cursor-pointer file:bg-gray-100 file:rounded-md file:px-3 file:py-1 file:mr-2 file:text-sm file:text-gray-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            {preview && (
                                <img src={preview} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover border" />
                            )}
                            <p className={`text-sm text-red-500 pl-2 transition-all duration-500 ${errors.photoURL ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                                {errors.photoURL?.message}
                            </p> */}


                            <label className="label mt-1">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 top-3 z-10">
                                    <Mail size={18} className="text-gray-400" />
                                </span>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                                    })}
                                    type="email"
                                    className="input pl-10 w-full focus:outline-none transition-all"
                                    placeholder="Enter your Email"
                                />
                            </div>
                            <p className={`text-sm text-red-500 pl-2 transition-opacity duration-500 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>{errors.email?.message}</p>

                            <label className="label mt-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 top-2.5 z-10">
                                    <Lock size={18} className="text-gray-400" />
                                </span>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters required" },
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*[A-Z])/, message: "Include both uppercase and lowercase letters"
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="input pl-10 pr-9 w-full focus:outline-none transition-all"
                                    placeholder="Enter your password"
                                />
                                <button type="button" onClick={handleShowPassword} className="absolute right-2 top-2.5 z-10 text-gray-400">
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                            <p className={`text-sm text-red-500 pl-2 transition-opacity duration-500 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>{errors.password?.message}</p>

                            <button type="submit" className="btn btn-neutral mt-4">Sign up</button>
                        </form>

                        <p className="text-center mt-4">Already have an account? <Link to="/auth/login" className="text-[#5dba76] font-semibold">LogIn</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
