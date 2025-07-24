"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
// Simple toast implementation
function showToast(message: string) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "32px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = "9999";
  toast.style.fontSize = "1rem";
  toast.style.opacity = "0.95";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.5s";
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 1800);
}
import { VariantSelector } from "@/components/ui/VariantSelector";
import Link from "next/link";

const door = {
  category: "Single",
  created_at: "Wed, 23 Jul 2025 15:26:51 GMT",
  description:
    "A sleek, durable interior door made from premium walnut wood. Perfect for contemporary homes.",
  id: "40dcc4c6-b87b-4e2a-960e-3f2ffac6e035",
  image_url: "/assets/door2.png",
  name: "Classic Walnut Door",
  price: "750.00",
  sub_images: ["/assets/door3.png", "/assets/door1.png"],
  variants: [
    {
      orientation: "left",
      stock: 18,
    },
    {
      orientation: "right",
      stock: 3,
    },
  ],
};

export default function DoorDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const maxStock =
    selectedVariant !== null ? door.variants[selectedVariant]?.stock || 1 : 1;

  // Carousel state
  const images = [door.image_url, ...door.sub_images];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handleMinus = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handlePlus = () => {
    setQuantity((q) => {
      if (q < maxStock) {
        return q + 1;
      } else {
        showToast("You can't select more of this variant");
        return q;
      }
    });
  };

  // Carousel navigation handlers
  const handlePrevImage = () => {
    setCurrentImageIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  };
  const handleNextImage = () => {
    setCurrentImageIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));
  };
  const handleSelectImage = (idx: number) => setCurrentImageIdx(idx);

  // Track if a variant has been selected
  const isAddToCartEnabled = selectedVariant !== null;

  // Add to Cart button state
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate add to cart delay
    setTimeout(() => {
      setIsAdding(false);
      // Update cart count in localStorage
      if (typeof window !== "undefined") {
        const prev = parseInt(localStorage.getItem("cartCount") || "0", 10);
        localStorage.setItem("cartCount", String(prev + quantity));
        // Dispatch event for header to update
        window.dispatchEvent(new Event("cartCountUpdate"));
      }
      showToast("Added to cart!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      <div className="max-w-7xl mx-auto">
        {/* Header with breadcrumb and pagination */}
        <div className="flex justify-between items-center mb-8 px-3">
          <div className="text-sm text-black font-semibold space-x-2">
            <Link href="/doors">
              <span className="text-gray-600">Our Doors</span>
            </Link>
            <span className="mx-2">/</span>
            <span>{door.name}</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {String(currentImageIdx + 1).padStart(2, "0")}
              </span>
              <span className="text-gray-200">/</span>
              <span className="text-gray-200">
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                className="p-2 hover:bg-gray-200 rounded"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start p-5">
          {/* Left side - Product info */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="flex flex-col justify-between h-full">
              {/* Top content */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {door.name}
                  </h1>
                  <p>
                    <span className="text-gray-600 text-sm">
                      {door.category} Door
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-[#17183B]">
                    GHS {door.price}
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {door.description}
                </p>
                <VariantSelector
                  variants={door.variants}
                  {...(selectedVariant !== null
                    ? { selected: selectedVariant }
                    : {})}
                  onSelect={(idx) => {
                    setSelectedVariant(idx);
                    setQuantity(1); // Reset quantity when variant changes
                  }}
                />
              </div>

              {/* Bottom - Variant, quantity, button */}
              <div className="space-y-4 mt-12">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      className="p-2 hover:bg-gray-100"
                      onClick={handleMinus}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      className="w-16 text-center border-0 focus:ring-0"
                      readOnly
                    />
                    <button
                      className={`p-2 hover:bg-gray-100 ${
                        quantity >= maxStock
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handlePlus}
                      disabled={quantity >= maxStock}
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative group">
                    <Button
                      className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2"
                      disabled={!isAddToCartEnabled || isAdding}
                      onClick={handleAddToCart}
                      aria-describedby={
                        !isAddToCartEnabled ? "add-to-cart-tooltip" : undefined
                      }
                    >
                      {isAdding ? "Adding to Cart..." : "Add to Cart"}
                    </Button>
                    {!isAddToCartEnabled && (
                      <div
                        id="add-to-cart-tooltip"
                        className="absolute left-1/2 -translate-x-1/2 -top-10 bg-gray-800 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap shadow-lg"
                        role="tooltip"
                      >
                        Please select an orientation first
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  *All doors come with free delivery and installation in Accra
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Product image */}
          <div className="space-y-4 min-h-[520px]">
            {/* Centered main product image with fixed height */}
            <div
              className="rounded-lg p-8 flex justify-center items-center"
              style={{ height: 420 }}
            >
              <Image
                src={images[currentImageIdx]}
                alt={door.name}
                width={500}
                height={500}
                className="object-contain h-full"
                style={{ maxHeight: "100%" }}
              />
            </div>

            {/* Centered thumbnail images */}
            <div className="flex gap-3 justify-center">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-20 border ${
                    idx === currentImageIdx
                      ? "border-blue-500"
                      : "border-gray-300"
                  } rounded overflow-hidden cursor-pointer`}
                  onClick={() => handleSelectImage(idx)}
                  aria-label={`Select image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Door variant ${idx + 1}`}
                    width={64}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
