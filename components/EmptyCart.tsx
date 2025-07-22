"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <ShoppingCart className="w-16 h-16 mb-4" />
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-700">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6 text-sm sm:text-base">
        Looks like you haven’t added anything yet.
      </p>
      <Link href="/doors">
        <Button className="">
          Browse Doors
        </Button>
      </Link>
    </div>
  );
}
