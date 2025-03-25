"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice/authSlice";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ Import Eye Icons
import { AppDispatch } from "@/store/store";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // 👁️ State for password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state:any) => state.auth);
  const token = localStorage.getItem("token");

  const onSubmit = (data:any) => {
    dispatch(loginUser());
  };

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome back!</h2>
          <p className="text-center text-gray-600 mb-4">
            Enter your credentials to access your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            {/* Password Input with Show/Hide Toggle */}
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"} // 👁️ Toggle between "text" and "password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // 👁️ Toggle Password Visibility
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" /> Remember for 30 days
              </label>
              <a href="#" className="text-blue-500">Forgot password?</a>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">Or</div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 flex items-center justify-center p-3 border rounded-md">
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
            <button className="flex-1 flex items-center justify-center p-3 border rounded-md">
              <FaApple className="mr-2" /> Sign in with Apple
            </button>
          </div>
          <p className="text-center mt-4">
            Don’t have an account? <a href="#" className="text-blue-500">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 justify-center items-center p-8">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--account-password-security-lock-design-development-illustrations-2757111.png?f=webp"
          alt="Signup Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
