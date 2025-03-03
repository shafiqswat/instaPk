/** @format */

"use client";
import Loading from "@/components/loading/Loading";
import AuthenticatedLanding from "@/components/pages/authentcated-landing/AuthenticatedLanding";
import GuestLanding from "@/components/pages/guest-landing/GuestLanding";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Loading />;
  }

  return (
    <div className=''>
      {isAuthenticated ? <AuthenticatedLanding /> : <GuestLanding />}
    </div>
  );
};

export default Home;
