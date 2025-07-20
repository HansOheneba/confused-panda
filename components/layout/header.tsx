"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }

      // Add background when scrolled down from top
      setIsScrolled(currentScrollY > 50);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-black/20 backdrop-blur-sm py-3"
          : "bg-transparent py-10"
      }`}
    >
      <div className="container mx-auto px-6 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/airbanWhiteLogo.png"
                alt="Airban Logo"
                width={150}
                height={150}
              />
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-blue-200">
                Home
              </Link>
              <Link href="/doors" className="text-white hover:text-blue-200">
                Our Doors
              </Link>
              <Link href="/properties" className="text-white hover:text-blue-200">
                Properties
              </Link>
              <Link href="/contact" className="text-white hover:text-blue-200">
                Contact Us
              </Link>
              <Link href="/about" className="text-white hover:text-blue-200">
                About Us
              </Link>
            </nav>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-blue-800 hover:bg-gray-100"
          >
            Brochure
          </Button>
        </div>
      </div>
    </header>
  );
}
