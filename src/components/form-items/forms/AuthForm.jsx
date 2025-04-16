/** @format */
"use client";
import { useAuth } from "@/context/auth.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthForm = ({ signUp }) => {
  const { signUpFun, signIn, loading, error } = useAuth();
  const router = useRouter();

  const inputData = [
    { type: "email", placeholder: "Mobile Number or Email" },
    { type: "password", placeholder: "Password" },
    { type: "text", placeholder: "Full Name " },
    { type: "text", placeholder: "Username" },
  ];

  // States for form fields
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp) {
      signUpFun({ fullName, userName, email, password });
    } else {
      signIn({ email, password });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='w-full border text-center p-3'>
      <Link href='/'>
        <img
          src='icons/loginLogo.png'
          alt='Login Logo'
          className='mt-5 invert mx-auto'
        />
      </Link>
      {signUp ? (
        <>
          <p className='my-5 font-semibold text-gray-500'>
            Sign up to see photos and videos from your friends.
          </p>
          <button className='bg-[#4CB5F9] text-white w-full p-1 font-semibold text-sm rounded-lg'>
            Log in with Facebook
          </button>
          <div className="flex items-center justify-center my-5 font-light text-xs text-gray-500 before:content-[''] before:w-full before:h-px before:bg-gray-300 before after:content-[''] before:mr-5 after:w-full after:h-px after:bg-gray-300 after:ml-5">
            OR
          </div>
          {inputData.map((items, i) => {
            return (
              <input
                key={i}
                type={items.type}
                className='border p-1 px-2 mb-2 bg-gray-50 placeholder:text-[12px] w-full focus:outline-none'
                placeholder={items.placeholder}
                required
                value={
                  items.placeholder === "Full Name "
                    ? fullName
                    : items.placeholder === "Username"
                    ? userName
                    : items.placeholder === "Mobile Number or Email"
                    ? email
                    : password
                }
                onChange={(e) => {
                  if (items.placeholder === "Full Name ") {
                    setFullName(e.target.value);
                  } else if (items.placeholder === "Username") {
                    setUserName(e.target.value);
                  } else if (items.placeholder === "Mobile Number or Email") {
                    setEmail(e.target.value);
                  } else {
                    setPassword(e.target.value);
                  }
                }}
              />
            );
          })}
          <p className='text-xs text-neutral-500'>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className='text-[#00376b] cursor-pointer'>Learn More</span>
          </p>
          <p className='text-xs text-neutral-500 mt-3'>
            By signing up, you agree to our{" "}
            <span className='text-[#00376b] cursor-pointer'>Terms</span> ,{" "}
            <span className='text-[#00376b] cursor-pointer'>
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className='text-[#00376b] cursor-pointer'>
              Cookies Policy
            </span>
          </p>
        </>
      ) : (
        <>
          <input
            type='email'
            className='border p-1 px-2 bg-gray-50 placeholder:text-[12px] mt-10 w-full focus:outline-none'
            placeholder='Phone number, username, or email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            className='border p-1 px-2 bg-gray-50 placeholder:text-[12px] mt-1 w-full focus:outline-none'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </>
      )}
      <button
        className='bg-[#4CB5F9] text-white w-full p-1 font-semibold text-sm rounded-lg my-5'
        type='submit'>
        {loading ? (
          <div className='parent-container'>
            <div className='spinner'></div>
          </div>
        ) : signUp ? (
          "Sign Up"
        ) : (
          "Log in"
        )}
      </button>
      {error && <p className='text-red-400 text-sm'>{error.message}</p>}
      <div className="flex justify-center items-center font-light text-xs text-gray-500 before:content-[''] before:w-full before:h-px before:bg-gray-300 before after:content-[''] before:mr-5 after:w-full after:h-px after:bg-gray-300 after:ml-5">
        OR
      </div>
      <div className='flex items-center justify-center font-semibold mt-4'>
        <img
          src='icons/facebookLogo.webp'
          alt='Facebook Logo'
          className='w-8 h-8'
        />
        <p className='text-sm cursor-pointer text-[#4CB5F9]'>
          Log in with Facebook
        </p>
      </div>
      <p
        className='text-sm mt-3 text-[#164878] cursor-pointer'
        onClick={() => router.push("/forgot-password")}>
        Forgot password?
      </p>
      <div className='p-5 border my-3 text-sm text-center'>
        {signUp ? "Have an account?" : "Don't have an account?"}
        <Link
          href={signUp ? "/login" : "/sign-up"}
          className='ml-2 text-[#0095f6] font-semibold cursor-pointer'>
          {signUp ? "Log in" : "Sign up"}
        </Link>
      </div>
      <p className='text-center text-sm my-4'>Get the app.</p>
      <div className='flex justify-center items-center gap-2'>
        <img
          src='/brands/googlePlay.png'
          alt='google play'
          className='w-32 h-10'
        />
        <img
          src='/brands/microsoft.png'
          alt='microsoft'
          className='w-32 h-10'
        />
      </div>
    </form>
  );
};

export default AuthForm;
