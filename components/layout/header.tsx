"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";

export function Header() {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowHeader(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY < lastY || currentScrollY < 100);
      setIsScrolled(currentScrollY > 50);
      lastY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted || !showHeader) return null;

  const initialShowClass = showHeader ? "animate-fade-in-down" : "";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out transform
      ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      ${
        isScrolled ? "bg-black/20 backdrop-blur-sm py-3" : "bg-transparent py-6"
      }
      ${initialShowClass}`}
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
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-4">
              <NavLinks />
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Desktop Buttons */}
            <Link href="/cart" className="hidden md:inline">
              
                <ShoppingCart size={18} className="text-white" />
            
            </Link>
            <Button
              variant="secondary"
              className="hidden md:flex items-center gap-2 bg-white text-airbanBlue hover:bg-gray-100"
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
          <div className="md:hidden mt-4 animate-in slide-in-from-top-5 fade-in duration-500 ease-out bg-black/80 backdrop-blur-lg rounded-xl px-6 py-6 space-y-6 text-white">
            <NavLinks mobile onClickLink={() => setMenuOpen(false)} />
            <div className="flex gap-2">
              <Link href="/cart" className="block w-full">
                <Button
                  className="w-full flex items-center gap-2 bg-white text-airbanBlue hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                  aria-label="View Cart"
                >
                  <ShoppingCart size={18} className="text-airbanBlue" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLinks({
  mobile = false,
  onClickLink,
}: {
  mobile?: boolean;
  onClickLink?: () => void;
}) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/doors", label: "Our Doors" },
    { href: "/properties", label: "Properties" },
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClickLink}
            className={`relative flex flex-col items-center ${
              mobile ? "text-lg font-medium" : "text-white text-sm font-medium"
            }`}
          >
            <span>{link.label}</span>
            <div
              className={`h-[2px] mt-1 rounded bg-white origin-left transition-transform duration-300 ease-in-out w-full ${
                isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
              style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
            />
          </Link>
        );
      })}
    </>
  );
}
