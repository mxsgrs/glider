'use client'

import { useState, useEffect } from "react"
import LoginForm from "./form"

import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ['latin']
});

export default function Page() {
  const [isWideScreen, setIsWideScreen] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWideScreen(window.matchMedia('(min-width: 1024px)').matches);
    };

    if (isWideScreen) {
      const img = new Image();
      img.src = '/images/white-container.jpg';
      img.onload = () => setIsImageLoaded(true);
    }
  }, [isWideScreen]);

  if (isWideScreen && !isImageLoaded) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex lg:w-1/3 xl:w-1/2 bg-[url('/images/white-container.jpg')] bg-cover">
        <h1 className={`hidden xl:block text-8xl text-white font-semibold leading-none tracking-tight p-12 mt-auto md:w-3/5 ${bebasNeue.className}`}>Advanced Logistics</h1>
      </div>
      <div className="flex-1 flex items-center justify-center lg:w-2/3 xl:w-1/2 lg:flex lg:flex-col">
        <LoginForm />
      </div>
    </div>
  );
}