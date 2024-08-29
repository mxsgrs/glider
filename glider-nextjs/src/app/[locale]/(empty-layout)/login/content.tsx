"use client";

import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
import LoginForm from "./form";

const bebasNeue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Content() {
  const [isWideScreen, setIsWideScreen] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWideScreen(window.matchMedia("(min-width: 1024px)").matches);
    }

    if (isWideScreen) {
      const img = new Image();
      img.src = "/images/harbor-containers.jpg";
      img.onload = () => setIsImageLoaded(true);
    }
  }, [isWideScreen]);

  if (isWideScreen && !isImageLoaded) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex lg:w-1/3 xl:w-1/2 bg-[url('/images/harbor-containers.jpg')] bg-cover">
      </div>
      <div className="flex-1 flex items-center justify-center lg:w-2/3 xl:w-1/2 lg:flex lg:flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
