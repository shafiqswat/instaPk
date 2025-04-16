/** @format */
"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { InstagramLogo, ResetPasswordIcon } from "@/constants/SvgIcon";
import { useAuth } from "@/context/auth.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const inputData = [
    { type: "email", placeholder: "Email, Phone, or Username", label: "email" },
    {
      type: "number",
      placeholder: "Enter the code we sent to your email",
      label: "code",
    },
    {
      type: "password",
      placeholder: "New Password",
      label: "password",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
  });

  const router = useRouter();
  const { ResetPassword, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ResetPassword({
      email: formData.email,
      forgotPasswordCode: formData.code,
      newPassword: formData.password,
    });
  };

  return (
    <ProtectedRoute forAuthPages>
      <div className='border-b p-4'>
        <div className='w-[70%] mx-auto'>
          <InstagramLogo onClick={() => router.push("/")} />
        </div>
      </div>
      <form
        className='w-[30%] mx-auto mt-10 border'
        onSubmit={handleSubmit}>
        <div className='flex flex-col items-center justify-center w-[80%] mx-auto p-5'>
          <ResetPasswordIcon />
          <h2 className='font-semibold'>Update Your Password</h2>
          <p className='text-sm'>
            Enter Your Email, Code and New Password to Update your Password.
          </p>
          {inputData.map((item, i) => (
            <input
              key={i}
              name={item.label}
              value={formData[item.label]}
              onChange={handleChange}
              type={item.type}
              placeholder={item.placeholder}
              required
              className='border my-1 w-full py-1 px-2 placeholder:text-sm placeholder:font-semibold rounded focus:outline focus:outline-1'
            />
          ))}
          <button
            type='submit'
            className={`w-full text-sm text-white font-semibold cursor-pointer ${
              formData.email ? "bg-sky-500" : "bg-sky-200"
            } p-2 rounded`}
            disabled={!formData.email}>
            {loading ? (
              <div className='parent-container'>
                <div className='spinner'></div>
              </div>
            ) : (
              "Send login link"
            )}
          </button>
          <p className='text-xs text-blue-900'>
            Can&apos;t reset your password?
          </p>
          <div className="flex items-center font-semibold text-xs text-gray-500 before:content-[''] before:w-28 mt-7 before:h-px before:bg-gray-300 before after:content-[''] before:mr-5 after:w-32 after:h-px after:bg-gray-300 after:ml-5">
            OR
          </div>
          {error && <p className='text-sm text-red-400'>{error.message}</p>}
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

export default ResetPassword;
