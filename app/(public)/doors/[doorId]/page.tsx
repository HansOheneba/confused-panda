"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";

const door = {
  category: "Single",
  created_at: "Wed, 23 Jul 2025 15:26:51 GMT",
  description:
    "A sleek, durable interior door made from premium walnut wood. Perfect for contemporary homes.",
  id: "40dcc4c6-b87b-4e2a-960e-3f2ffac6e035",
  image_url: "https://example.com/images/walnut-main.jpg",
  name: "Classic Walnut Door",
  price: "750.00",
  sub_images: [
    "https://example.com/images/walnut-angle1.jpg",
    "https://example.com/images/walnut-closeup.jpg",
    "https://example.com/images/walnut-angle2.jpg",
  ],
  variants: [
    {
      color: "#E2C799", // Light Walnut
      orientation: "left",
      stock: 4,
    },
    {
      color: "#7C5E3C", // Dark Walnut
      orientation: "left",
      stock: 5,
    },
    {
      color: "#7C5E3C", // Dark Walnut
      orientation: "right",
      stock: 3,
    },
  ],
};

export default function DoorDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const handleMinus = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handlePlus = () => setQuantity((q) => q + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      <div className="max-w-7xl mx-auto">
        {/* Header with breadcrumb and pagination */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-black">
            <span>Our Doors</span>
            <span className="mx-2">/</span>
            <span>{door.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">01</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">05</span>
            <div className="flex gap-2 ml-4">
              <button className="p-2 hover:bg-gray-200 rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {door.name}
              </h1>
              <p className="text-lg font-semibold text-gray-700">
                GHS {door.price}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">{door.description}</p>



            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button className="p-2 hover:bg-gray-100" onClick={handleMinus}>
                  <Minus className="w-4 h-4" />
                </button>
                <Input
                  type="number"
                  value={quantity}
                  className="w-16 text-center border-0 focus:ring-0"
                  readOnly
                />
                <button className="p-2 hover:bg-gray-100" onClick={handlePlus}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2">
                Add to Cart
              </Button>
            </div>

            <p className="text-sm text-gray-600">*Free Installation</p>
          </div>

          {/* Right side - Product image */}
          <div className="space-y-4">
            <div className=" rounded-lg p-8 mx-auto">
              <Image
                src={"/assets/door2.png"}
                alt={door.name}
                width={200}
                height={400}
                className=""
              />
            </div>

            {/* Thumbnail images */}
            <div className="flex gap-3 justify-center">
              {[door.image_url, ...(door.sub_images || [])].map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-20 border ${
                    idx === 0 ? "border-blue-500" : "border-gray-300"
                  } rounded overflow-hidden`}
                >
                  <Image
                    src={img || "/assets/door2.png"}
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
