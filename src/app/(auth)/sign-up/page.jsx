/** @format */

import AuthForm from "@/components/form-items/forms/AuthForm";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import React from "react";

const SignUp = () => {
  return (
    <ProtectedRoute forAuthPages>
      <div className='mx-auto p-5 w-full md:w-[40%] lg:w-[30%]'>
        <AuthForm signUp={true} />
      </div>
    </ProtectedRoute>
  );
};

export default SignUp;
