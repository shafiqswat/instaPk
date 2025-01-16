/** @format */

"use client";

import AuthForm from "@/components/form-items/forms/AuthForm";
import { LinksData } from "@/constants";
import Link from "next/link";
import { useState, useEffect } from "react";

import React from "react";

const GuestLanding = () => {
  const onboardingImages = [
    "onboarding/onboarding1.png",
    "onboarding/onboarding2.png",
    "onboarding/onboarding3.png",
    "onboarding/onboarding4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === onboardingImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsFading(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='flex justify-center p-10'>
        <div className='grid xl:w-[60%] justify-center items-center w-full xl:grid-cols-2 gap-10'>
          <div className='xl:col-span-1  relative onboarding mx-auto'>
            <img
              src={onboardingImages[currentImageIndex]}
              alt={`Onboarding Image ${currentImageIndex + 1}`}
              className={`absolute top-5 right-6 w-[240px] h-[500px] transition-opacity duration-1000 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
          <div className='xl:col-span-1'>
            <AuthForm />
          </div>
          <div className='flex gap-3 xl:flex-nowrap flex-wrap'>
            {LinksData.map((items, i) => {
              return (
                <Link
                  href={items.href}
                  key={i}
                  className='text-xs text-gray-600 text-nowrap'>
                  {items.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className='mb-12 text-xs text-gray-600 text-center'>
        © 2024 Instagram from Meta
      </div>
    </>
  );
};

export default GuestLanding;
