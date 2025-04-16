/** @format */
import AuthForm from "@/components/form-items/forms/AuthForm";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import React from "react";

const Login = () => {
  return (
    <ProtectedRoute forAuthPages>
      <div className='mx-auto p-5 w-full md:w-[40%] lg:w-[30%]'>
        <AuthForm />
      </div>
    </ProtectedRoute>
  );
};

export default Login;
