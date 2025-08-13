"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="bg-gradient-to-b from-[#D5E9FF] to-white py-12 px-6 mt-auto animate-fade-in-up">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/logoFooter.png"
              alt="Airban Logo"
              width={120}
              height={40}
            />
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              NAVIGATE
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/home"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Properties
              </Link>
              <Link
                href="/doors"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Doors
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cart
              </Link>
            </nav>
          </div>

          {/* About & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              COMPANY
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/news"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                News
              </Link>
              <div className="text-sm">
                {/* Show Sign In if signed out, UserButton if signed in */}
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <span className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                        Sign in
                      </span>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </>
              </div>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              LEGAL
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="terms-of-service"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="privacy-policy"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Airban Homes. All Rights Reserved
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/people/Airban-Homes/100083341262318/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.instagram.com/myairbanhomes/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/airban-homes/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
