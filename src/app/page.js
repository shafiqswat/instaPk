/** @format */

"use client";
import Loading from "@/components/loading/Loading";
import AuthenticatedLanding from "@/components/pages/authentcatedLanding/AuthenticatedLanding";
import GuestLanding from "@/components/pages/guestLanding/GuestLanding";
import { useAuth } from "@/context/auth.context";

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
