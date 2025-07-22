"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logoVisible, setLogoVisible] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Fade out the logo first
    const logoTimer = setTimeout(() => setLogoVisible(false), 1800);

    // Then fade out the background
    const splashTimer = setTimeout(() => setSplashVisible(false), 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(splashTimer);
    };
  }, []);

  return (
    <>
      {splashVisible && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center animate-fade animate-duration-[800ms] animate-ease-out animate-fill-forwards">
          <Image
            src="/assets/airbanWhiteLogo.png"
            alt="Airban Logo"
            width={180}
            height={180}
            priority
            className={`mb-4 transition-opacity duration-1500 animate-ping animate-once animate-ease-in-out animate-reverse ${
              logoVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}

      <div
        className={`transition-opacity duration-500 ${
          splashVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
