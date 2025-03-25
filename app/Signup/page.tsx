"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ Import Eye Icons
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/slices/authSlice/authSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.boolean().refine(val => val, "You must accept the terms"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false); // 👁️ State for password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

   const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, signUpSuccess } = useSelector((state:any) => state.auth);

  const onSubmit = (data:any) => {
    dispatch(signupUser());
  };

  useEffect(() => {
    if (signUpSuccess) {
      router.push("/login");
    }
  }, [signUpSuccess]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Get Started Now</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name")}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>

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

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("terms")} className="w-4 h-4" />
              <label className="text-sm">
                I agree to the <a href="#" className="text-blue-500">terms & policy</a>
              </label>
            </div>
            <p className="text-red-500 text-sm">{errors.terms?.message}</p>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
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
            Have an account? <a href="#" className="text-blue-500">Sign In</a>
          </p>
        </div>
      </div>
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
