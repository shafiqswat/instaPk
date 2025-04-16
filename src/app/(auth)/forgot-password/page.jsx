/** @format */
"use client";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { InstagramLogo, ResetPasswordIcon } from "@/constants/SvgIcon";
import { useAuth } from "@/context/auth.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { ForgotPassword, loading, error } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    ForgotPassword({ email });
  };
  return (
    <ProtectedRoute forAuthPages>
      <div className='border-b p-4'>
        <div className='w-[70%] mx-auto'>
          <InstagramLogo onClick={() => router.push("/")} />
        </div>
      </div>
      <form
        className='w-[30%] mx-auto mt-10 scroll-auto border'
        onSubmit={handleSubmit}>
        <div className='flex flex-col items-center justify-center w-[80%] mx-auto p-5'>
          <ResetPasswordIcon />
          <h2 className='font-semibold'>Trouble logging in?</h2>
          <p className='text-sm'>
            Enter your email, phone, or username and we&apos;ll send you a link
            to get back into your account.
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email, Phone, or Username'
            className='border w-full py-1 px-2 my-3 placeholder:text-sm placeholder:font-semibold rounded focus:outline focus:outline-1'
          />
          <button
            className={`w-full text-sm text-white font-semibold ${
              email.length > 0 ? "bg-sky-500" : "bg-sky-200 "
            } p-2 rounded`}>
            {loading ? (
              <div className='parent-container'>
                <div className='spinner'></div>
              </div>
            ) : (
              "Send Login Link"
            )}
          </button>
          <p className='text-xs text-blue-900'>
            Can&apos;t reset your password?
          </p>
          {error && <p className='text-sm text-red-400'>{error.message}</p>}
          <div className="flex items-center font-semibold text-xs text-gray-500 before:content-[''] before:w-28 mt-7 before:h-px before:bg-gray-300 before after:content-[''] before:mr-5 after:w-32 after:h-px after:bg-gray-300 after:ml-5">
            OR
          </div>
          <p
            className='text-sm font-semibold mt-5 cursor-pointer'
            onClick={() => router.push("/sign-up")}>
            Create new account
          </p>
        </div>
        <div className='border w-full p-3 flex justify-center bg-gray-100 mt-10'>
          <Link
            href='/login'
            className='text-sm font-semibold'>
            Back to login
          </Link>
        </div>
      </form>
    </ProtectedRoute>
  );
};

export default ForgotPassword;
