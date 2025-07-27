"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { VariantSelector } from "@/components/ui/VariantSelector";
import Link from "next/link";
import { CartItem } from "@/types";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

// Improved toast implementation
const showToast = (message: string) => {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className =
    "fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg z-50 text-sm font-medium animate-fade-in-up";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-fade-out");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
};

interface DoorData {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  sub_images: string[];
  type: string;
  stock: number;
  created_at: string;
  variants?: { orientation: string }[];
}

export default function DoorDetailsPage() {
  const params = useParams();
  // For dynamic route [doorId], param is doorId
  const id = params.doorId;
  const [door, setDoor] = useState<DoorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const fetchDoor = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/doors/${id}`
        );
        console.log(
          "Fetching door with URL:",
          `${process.env.NEXT_PUBLIC_API_URL}/doors/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch door");
        }

        const data: DoorData = await response.json();

        // Ensure variants exist (fallback to default if not)
        if (!data.variants) {
          data.variants = [{ orientation: "left" }, { orientation: "right" }];
        }

        setDoor(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching door:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoor();
  }, [id]);

  const handleMinus = () => setQuantity((q) => Math.max(1, q - 1));

  const handlePlus = () => {
    setQuantity((q) => {
      if (door && q < door.stock) return q + 1;
      showToast("Maximum quantity reached");
      return q;
    });
  };

  const handleAddToCart = () => {
    if (!door || selectedVariant === null) return;

    setIsAdding(true);

    try {
      const cartRaw = localStorage.getItem("cart");
      const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

      const orientation = door.variants![selectedVariant].orientation;

      const existingItemIndex = cart.findIndex(
        (item) => item.id === door.id && item.orientation === orientation
      );

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({
          id: door.id,
          name: door.name,
          price: door.price,
          image: door.image_url,
          orientation,
          quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      showToast("Added to cart!");
    } catch (error) {
      console.error("Failed to update cart:", error);
      showToast("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handlePrevImage = () => {
    if (!door) return;
    setCurrentImageIdx((idx) => (idx === 0 ? door.sub_images.length : idx - 1));
  };

  const handleNextImage = () => {
    if (!door) return;
    setCurrentImageIdx((idx) => (idx === door.sub_images.length ? 0 : idx + 1));
  };

  const handleSelectImage = (idx: number) => setCurrentImageIdx(idx);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        <div className="max-w-7xl mx-auto p-5">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-1/2" />
              <div className="space-y-4 mt-12">
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-48" />
                </div>
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Right side skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-[420px] w-full" />
              <div className="flex gap-3 justify-center">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-16 h-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        <div className="max-w-7xl mx-auto p-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading door</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <Link href="/doors">
            <Button className="bg-blue-900 hover:bg-blue-800">
              Back to Doors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!door) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        <div className="max-w-7xl mx-auto p-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Door not found</h2>
          <Link href="/doors">
            <Button className="bg-blue-900 hover:bg-blue-800">
              Back to Doors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter out empty or falsy image URLs and use a placeholder if none exist
  const placeholder = "/assets/placeholder.png";
  const images =
    [door.image_url, ...(door.sub_images || [])].filter(
      (img) => !!img && img.trim() !== ""
    ).length > 0
      ? [door.image_url, ...(door.sub_images || [])].filter(
          (img) => !!img && img.trim() !== ""
        )
      : [placeholder];
  const isAddToCartEnabled = selectedVariant !== null && door.stock > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <div className="max-w-7xl mx-auto">
        {/* Header with breadcrumb and pagination */}
        <div className="flex justify-between items-center mb-8 px-3">
          <div className="text-sm text-white font-semibold flex items-center">
            <Link href="/doors" className="hover:underline">
              Our Doors
            </Link>
            <span className="mx-2">/</span>
            <span>{door.name}</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-2xl font-bold">
                {String(currentImageIdx + 1).padStart(2, "0")}
              </span>
              <span className="">/</span>
              <span className="">{String(images.length).padStart(2, "0")}</span>
            </div>
            <div className="flex justify-center items-center gap-2 ml-4">
              <button
                className="p-2 hover:bg-airbanBlue/20 rounded"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                className="p-2 hover:bg-airbanBlue/20 rounded"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
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
                      {door.type} Door
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
                  options={door.variants!.map((v) => v.orientation)}
                  selected={
                    selectedVariant === null ? undefined : selectedVariant
                  }
                  onSelect={(idx) => {
                    setSelectedVariant(idx);
                    setQuantity(1);
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
                        quantity >= door.stock
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handlePlus}
                      disabled={quantity >= door.stock}
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2"
                    disabled={!isAddToCartEnabled || isAdding}
                    onClick={handleAddToCart}
                  >
                    {isAdding ? "Adding to Cart..." : "Add to Cart"}
                  </Button>
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
                priority
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
