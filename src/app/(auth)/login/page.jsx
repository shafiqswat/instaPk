/** @format */
import AuthForm from "@/components/form-items/forms/AuthForm";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import React from "react";

const Login = () => {
  return (
    <ProtectedRoute forAuthPages>
      <div className='flex justify-center p-5'>
        <AuthForm />
      </div>
    </ProtectedRoute>
  );
};

export default Login;
