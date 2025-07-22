"use client";

import Image from "next/image";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white  text-black ">
      {/* Logo with subtle float animation */}
      <div className="animate-[float_3s_ease-in-out_infinite]">
        <Image
          src="/assets/logoFooter.png"
          alt="Airban Logo"
          width={120}
          height={120}
          priority
        />
      </div>

      {/* Spinner from @heroui/react */}
      <div className="mt-6">
        <Spinner />
      </div>

      {/* Sophisticated Text */}
      <p className="text-airbanBlue font-medium tracking-wide text-base mt-6">
        Preparing your experience...
      </p>
    </div>
  );
}
