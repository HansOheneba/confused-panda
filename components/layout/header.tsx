"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show header after a short delay for animation
    const timer = setTimeout(() => setShowHeader(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount to set correct state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mounted]);

  if (!mounted || !showHeader) return null;
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50
        ${show ? "animate-slide-in-from-top animate-fade-in" : "-translate-y-full opacity-0"}
        transition-all duration-500
        ${isScrolled ? "bg-black/20 backdrop-blur-sm py-3" : "bg-transparent py-6"}
      `}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo + Nav */}
          <div className="flex items-center space-x-10">
            <Link href="/">
              <Image
                src="/assets/airbanWhiteLogo.png"
                alt="Airban Logo"
                width={150}
                height={150}
                className="cursor-pointer"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Desktop Brochure Button */}
            <Button
              variant="secondary"
              className="hidden md:inline bg-white text-airbanBlue hover:bg-gray-100"
            >
              Brochure
            </Button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <X size={28} className="text-white" />
                ) : (
                  <Menu size={28} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 animate-in slide-in-from-top-5 fade-in duration-500 ease-out bg-black/80 backdrop-blur-lg rounded-xl px-6 py-4 space-y-4 text-white">
            <NavLinks mobile />
            <Button className="w-full bg-white text-blue-800 hover:bg-gray-100">
              Brochure
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const classes = mobile
    ? "block text-white text-lg font-medium"
    : "text-white hover:text-blue-200 text-sm";
  return (
    <>
      <Link href="/" className={classes}>
        Home
      </Link>
      <Link href="/doors" className={classes}>
        Our Doors
      </Link>
      <Link href="/properties" className={classes}>
        Properties
      </Link>
      <Link href="/contact" className={classes}>
        Contact Us
      </Link>
      <Link href="/about" className={classes}>
        About Us
      </Link>
    </>
  );
}
