'use client';

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/logoFooter.png"
              alt="Airban Logo"
              width={120}
              height={40}
            />
          </div>

          {/* Sell a Home */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              SELL A HOME
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Request an offer
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Reviews
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Stories
              </Link>
            </nav>
          </div>

          {/* Buy a Home */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              BUY A HOME
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Buy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Finance
              </Link>
            </nav>
          </div>

          {/* Buy, Rent and Sell */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              BUY, RENT AND SELL
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Buy and sell properties
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Rent home
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Builder trade-up
              </Link>
            </nav>

            {/* Terms & Privacy */}
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                TERMS & PRIVACY
              </h3>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Trust & Safety
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              ABOUT
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Company
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Investors
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              RESOURCES
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Guides
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Help Center
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
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
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
