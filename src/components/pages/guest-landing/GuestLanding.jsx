/** @format */

"use client";

import AuthForm from "@/components/form-items/forms/AuthForm";
import { LinksData } from "@/constants";
import Link from "next/link";
import { useState, useEffect } from "react";

const GuestLanding = () => {
  const onboardingImages = [
    "/onboarding/onboarding1.png",
    "/onboarding/onboarding2.png",
    "/onboarding/onboarding3.png",
    "/onboarding/onboarding4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % onboardingImages.length
        );
        setIsFading(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className='flex flex-col xl:flex-row items-center justify-center xl:items-start gap-6 p-5'>
        <div className='relative w-[250px] xs:w-[380px] h-[580px] '>
          <img
            src='/onboarding/emulator.png'
            alt='Onboarding Emulator'
            className='max-w-full h-full'
          />
          <img
            src={onboardingImages[currentImageIndex]}
            alt={`Onboarding Step ${currentImageIndex + 1}`}
            className={`absolute top-5 right-[2rem] xs:right-[3rem] xs:w-[210px] w-[130px] h-[500px] transition-opacity duration-1000 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div className='w-full md:w-2/5 '>
          <AuthForm />
        </div>
      </section>

      <nav className='flex flex-wrap justify-center gap-4 my-5 text-xs text-gray-600'>
        {LinksData.map((item, i) => (
          <Link
            href={item.href}
            key={i}
            className='whitespace-nowrap'>
            {item.text}
          </Link>
        ))}
      </nav>

      <footer className='text-xs text-gray-600 text-center mb-12'>
        &copy; 2024 Instagram from Meta
      </footer>
    </main>
  );
};

export default GuestLanding;
